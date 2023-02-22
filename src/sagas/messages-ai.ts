import actions, { IPayload } from "../reducers/actions";
import { all, select, takeLatest } from "redux-saga/effects";
import { IMessage, IUser } from "../reducers/interfaces";


const AI_CONFIG = {
    model: "text-davinci-003",
    max_tokens: 2000,
    temperature: 0.7,
    top_p: 1,
    n: 1,
    stream: false,
    logprobs: null,
    stop: "\n\n",

    SETTING_CONTEXT: `context: tabletop text roleplaying game in Fallout setting. you are GameMaster, make text adventures for players. world is dangerous and tricky.\n\n`,
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

    console.log('messages', messages);
    console.log('users', users);

    const contextMessages = [];
    let tokens = 0;

    for (const message of messages) {
        if ((IC && message.isRP) || (OOC && !message.isRP)) {
            const nickPrefix = `${users[message.author].nickname}: `;
            const text = `${message.body.indexOf(nickPrefix) == 0 ? '' : nickPrefix}${message.body}`;
            tokens += text.split(' ').length * 4;

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
        uid = AI_CONFIG.AI_UID
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

        actions.sendMessage({
            uid,
            message: `${message}${choice.text}`.trim(),
        });

        actions.sendMessageAiSuccess({});
    } catch(error) {
        actions.sendMessageAiFail({});
        console.error(error);
        actions.notify({ message: "ИИ ошибка, смотри консоль "});
    }

    actions.setIsTyping({ isTyping: false, uid: AI_CONFIG.AI_UID });
    return true;
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
                size: '256x256'
            })
        });

        const result: { data: [ {url: string } ] } = yield response.json();

        console.log('ai message response', result);

        const data = result.data;
        const url = data[Math.floor(Math.random() * data.length)].url;
        console.log(url);

        actions.sendMessage({ uid, message: url })
        actions.sendMessagePhotoAiSuccess({});
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
