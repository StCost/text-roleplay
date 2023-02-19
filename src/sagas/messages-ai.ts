import actions, {IPayload} from "../reducers/actions";
import {all, select, takeLatest} from "redux-saga/effects";
import {IMessage, IUser} from "../reducers/interfaces";

const MAX_TOKENS = 500;

function* getContext() {
    // @ts-ignore
    const messages: IMessage[] = yield select(({messages}) => messages);
    const users: IMessage[] = yield select(({users}) => users);
    console.log('messages', messages);
    console.log('users', users);

    const contextMessages = [];
    let tokens = 0;
    for (let i = 0; i < messages.length; i++) {
        const message = users[messages[i].author].nickname + ": " + messages[i].body;
        tokens += message.split(' ').length * 4;

        if (tokens < MAX_TOKENS / 2) {
            contextMessages.push("\n" + message);
        } else {
            break;
        }
    }

    const context = contextMessages.reverse().join('\n');
    console.log('ai context', context);
    return context.trim();
}

//@ts-ignore
window.ai = {
    "model": "text-davinci-003",
    // @ts-ignore
    "max_tokens": MAX_TOKENS,
    "temperature": 0.7,
    "top_p": 1,
    "n": 1,
    // @ts-ignore
    "stream": false,
    "logprobs": null,
    "stop": "\n\n",
};

const ai = localStorage.getItem('ai');
// @ts-ignore
if (ai) window.ai = JSON.parse(ai);

function* sendMessageAI(payload: IPayload) {
    const {message = '\n\n'} = payload;

    const context: string = yield getContext();
    const userData: IUser = yield select(({users, userData}) => users[userData.uid]);
    console.log(userData);

    // @ts-ignore
    localStorage.setItem('ai', JSON.stringify(window.ai));

    fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userData.aiApiKey,
        },
        body: JSON.stringify(
            {
                //@ts-ignore
                ...window.ai,
                "prompt": context + message,
            })
    })
        .then((response) => {
            // @ts-ignore
            const reader = response.body.getReader();
            return new ReadableStream({
                start(controller) {
                    return pump();

                    // @ts-ignore
                    function pump() {
                        return reader.read().then(({done, value}) => {
                            // When no more data needs to be consumed, close the stream
                            if (done) {
                                controller.close();
                                return;
                            }
                            // Enqueue the next data chunk into our target stream
                            controller.enqueue(value);
                            return pump();
                        });
                    }
                }
            })
        })
        // Create a new response out of the stream
        .then((stream) => new Response(stream))
        // Create an object URL for the response
        .then((response) => response.json())
        .then(result => {
            console.log('ai message response', result);

            const choices = result.choices;
            const choice = choices[Math.floor(Math.random() * choices.length)];
            actions.sendMessage({
                uid: 'V59PbTTratf4XuFRg7lEnIQrtxf1', // dev user
                message: choice.text.trim()
            });
            actions.sendMessageAiSuccess({});
        }).catch(() => actions.sendMessageAiFail({}))

    return true;
}


export default function* watchForActions() {
    yield all([
        takeLatest('SEND_MESSAGE_AI', sendMessageAI),
    ])
}