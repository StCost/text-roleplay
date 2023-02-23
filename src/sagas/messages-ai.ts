import actions, { IPayload } from "../reducers/actions";
import { all, select, takeLatest } from "redux-saga/effects";
import { IMessage, IUser } from "../reducers/interfaces";
import {base64ToUrl, uploadFile} from "../components/InputUpload";
import {urlRegex} from "../helpers/utils";


const AI_CONFIG = {
    model: "text-davinci-003",
    max_tokens: 2000,
    temperature: 0.7,
    top_p: 1,
    n: 1,
    stream: false,
    logprobs: null,
    stop: "\n\n",

    SETTING_CONTEXT: `context: tabletop text roleplaying game in Fallout 2 setting. desert, dust, nevada, everyone armed and suspicious. you are GameMaster, make text adventures for players. world is dangerous and tricky. add challenge to players often\n\n`,
    AI_UID: 'V59PbTTratf4XuFRg7lEnIQrtxf1',
};

// @ts-ignore
window.ai = AI_CONFIG;

const ai = localStorage.getItem('ai');
// @ts-ignore
if (ai) window.ai = JSON.parse(ai);

function* getContext(IC: boolean, OOC: boolean) {
    const messages: IMessage[] = yield select(({ messages }) => messages);
    const users: IMessage[] = yield select(({ users }) => users);

    const contextMessages = [];
    let tokens = 0;

    for (const message of messages) {
        if ((IC && message.isRP) || (OOC && !message.isRP)) {
            const nickPrefix = `${users[message.author].nickname}: `;
            const fullPrefix = message.body.indexOf(nickPrefix) == 0 ? '' : nickPrefix;
            const body = message.body.replace(urlRegex, '').trim(); // remove urls, AI doesnt need them

            if (!body) continue; // dont send empty messages

            const text =`${fullPrefix}${body}`.trim();
            tokens += text.split(' ').length * 6;

            // @ts-ignore
            if (tokens < window.ai.max_tokens / 2) {
                contextMessages.push(`\n${text}`);
            } else {
                break;
            }
        }
    }

    contextMessages.push(AI_CONFIG.SETTING_CONTEXT);

    const context = contextMessages.reverse().join('\n');

    console.log('ai context', context);

    return context.trim();
}

function* sendMessageAI(payload: IPayload) {
    const {
        message = '\n\n',
        IC = true,
        OOC = true,
        uid = AI_CONFIG.AI_UID,
        setMessageInsteadCallback,
    } = payload;
    const context: string = yield getContext(IC, OOC);
    const userData: IUser = yield select(({ users, userData }) => users[userData.uid]);

    console.log(userData);

    localStorage.setItem('ai', JSON.stringify(AI_CONFIG));
    actions.setIsTyping({ isTyping: true, uid: AI_CONFIG.AI_UID });

    try {
        const response: Response = yield fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userData.aiApiKey}`,
            },
            body: JSON.stringify({
                ...AI_CONFIG,
                SETTING_CONTEXT: undefined,
                AI_UID: undefined,
                prompt: `${context}${message}`,
            })
        });

        const result: { choices: [ {text: string } ] } = yield response.json();

        console.log('ai message response', result);

        const choices = result.choices;
        const choice = choices[Math.floor(Math.random() * choices.length)];

        const text = `${message}${choice.text}`.trim();

        if (setMessageInsteadCallback)
            setMessageInsteadCallback(text)
        else {

            if (!choice.text)
                actions.notify({ message: "ИИ нечего сказать" })
            else
            actions.sendMessage({
                uid,
                message: text,
            });
        }

        actions.sendMessageAiSuccess({});
    } catch(error) {
        actions.sendMessageAiFail({});
        console.error(error);
        actions.notify({ message: "ИИ ошибка, смотри консоль "});
    }

    actions.setIsTyping({ isTyping: false, uid: AI_CONFIG.AI_UID });
    return true;
}

function dataURLtoFile(dataurl: string, filename: string) {
    var arr = dataurl.split(','), mime = 'image',
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

function* sendMessagePhotoAI(payload: IPayload) {
    const {
        message,
        // uid
    } = payload;
    const uid = AI_CONFIG.AI_UID;

    console.log(message);
    const userData: IUser = yield select(({ users, userData }) => users[userData.uid]);

    actions.setIsTyping({ isTyping: true, uid: AI_CONFIG.AI_UID });
    try {
        const response: Response = yield fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userData.aiApiKey}`,
            },
            body: JSON.stringify({
                prompt: message,
                response_format: 'b64_json',
                size: '256x256'
            })
        });

        const result: { data: [ {b64_json: string } ] } = yield response.json();

        console.log('ai message response', result);

        const data = result.data;

        const b64_json = data[Math.floor(Math.random() * data.length)].b64_json;
        console.log(b64_json);
        const url = base64ToUrl(b64_json);

        // const res: Response = yield call(fetch, url);
        // const buffer: ArrayBuffer = yield call(res.arrayBuffer);
        // const file: File = new File([buffer], message, {type: 'image'});
        const file: File = dataURLtoFile(base64ToUrl(b64_json), 'a.png');

        uploadFile(file, (imgurLink: string) => {
            actions.sendMessage({ uid, message: imgurLink });
            actions.sendMessagePhotoAiSuccess({});
        }, () => {
            actions.sendMessagePhotoAiSuccess({});
        })

        // uploadFile
    } catch(error) {
        actions.sendMessagePhotoAiFail({});
        console.error(error);
        actions.notify({ message: "ИИ ошибка, смотри консоль "});
    }
    actions.setIsTyping({ isTyping: false, uid: AI_CONFIG.AI_UID });

    return true;
}

export default function* watchForActions() {
    yield all([
        takeLatest('SEND_MESSAGE_AI', sendMessageAI),
        takeLatest('SEND_MESSAGE_PHOTO_AI', sendMessagePhotoAI),
    ]);
}
