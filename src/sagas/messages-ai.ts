import actions, { IPayload } from "../reducers/actions";
import { all, select, takeLatest } from "redux-saga/effects";
import { IMessage, IUser } from "../reducers/interfaces";

const SETTING_CONTEXT = `
  context: tabletop text roleplaying game in Fallout setting. you are GameMaster, make text adventures for players\n\n
`;

function* getContext(IC: boolean, OOC: boolean) {
    const messages: IMessage[] = yield select(({ messages }) => messages);
    const users: IMessage[] = yield select(({ users }) => users);

    console.log('messages', messages);
    console.log('users', users);

    const contextMessages = [];
    let tokens = 0;

    for (const message of messages) {
        if ((IC && message.isRP) || (OOC && !message.isRP)) {
            const text = `${users[message.author].nickname}: ${message.body}`;
            tokens += text.split(' ').length * 4;

            // @ts-ignore
            if (tokens < window.ai.max_tokens / 2) {
                contextMessages.push(`\n${text}`);
            } else {
                break;
            }
        }
    }

    contextMessages.push(SETTING_CONTEXT);

    const context = contextMessages.reverse().join('\n');

    console.log('ai context', context);

    return context.trim();
}

const AI_CONFIG = {
    model: "text-davinci-003",
    max_tokens: 2000,
    temperature: 0.7,
    top_p: 1,
    n: 1,
    stream: false,
    logprobs: null,
    stop: "\n\n",
};

const ai = localStorage.getItem('ai');
// @ts-ignore
if (ai) window.ai = JSON.parse(ai);

const AI_UID = 'V59PbTTratf4XuFRg7lEnIQrtxf1';

function* sendMessageAI(payload: IPayload) {
    const { message = '', IC = true, OOC = true, uid = AI_UID } = payload;
    const context: string = yield getContext(IC, OOC);
    const userData: IUser = yield select(({ users, userData }) => users[userData.uid]);

    console.log(userData);

    localStorage.setItem('ai', JSON.stringify(AI_CONFIG));
    actions.setIsTyping({ isTyping: true, uid: AI_UID });

    try {
        const response: Response = yield fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userData.aiApiKey}`,
            },
            body: JSON.stringify({
                ...AI_CONFIG,
                prompt: `${context}${message}`,
            })
        });

        const result: { choices: [ {text: string } ] } = yield response.json();

        console.log('ai message response', result);

        const choices = result.choices;
        const choice = choices[Math.floor(Math.random() * choices.length)];

        actions.sendMessage({
            uid,
            message: `${message}${uid == AI_UID ? '\n\n' : ''}${choice.text}`.trim(),
        });

        actions.sendMessageAiSuccess({});
        actions.setIsTyping({ isTyping: false, uid: AI_UID });
    } catch {
        actions.sendMessageAiFail({});
        actions.setIsTyping({ isTyping: false, uid: AI_UID });
    }

    return true;
}

export default function* watchForActions() {
    yield all([
        takeLatest('SEND_MESSAGE_AI', sendMessageAI),
    ]);
}
