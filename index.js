require('dotenv').config();
const OpenAI = require('openai');

// Rest of your application code goes here
console.log(process.env.API_KEY);



const query_1 ="Look at the plays Othello and Winter's tale that mention animals and give me a list of those animals in JSON format";
const query_2 = "Make images of all the animals in the array in the plays property of the following JSON object";

const openai = new OpenAI({ apiKey: process.env.API_KEY});

const main = async () => {
    // use openai.Completions.create() to generate completions according to the const query_1
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{"role":"user","content":query_1}],
        max_tokens: 300
    })
    console.log(response.choices[0].message.content);

    const responseJson = JSON.parse(response.choices[0].message.content);
};

main();



