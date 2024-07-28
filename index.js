require('dotenv').config();
const readline = require('readline');
const OpenAI = require('openai');

const imageStyles = ["science fiction", "anime", "fantasy", "abstract", "realism"];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


/***
 * This function generates an image based on the result of discovering the
 * animals in the plays Othello and A Winter's Tale.
 * @param selectedStyle The style of the image to be generated
 * @returns {Promise<void>} The function writes the URL of the generated
 *                          image to the console
 */
async function generateImage(selectedStyle) {
    // Create an instance of the OpenAI API
    const openai = new OpenAI({apiKey: process.env.API_KEY});

    // The query to get the animals from the plays
    const query_1 ="Look at the plays Othello and A Winter's Tale" +
        "that mention animals and give me a list of those animals in JSON format";

    // get the animals from the plays
    let response = await openai.chat.completions.create({
        model: 'gpt-4-turbo',
        messages: [{"role": "user", "content": query_1}],
        max_tokens: 300
    });

    // The query to make a list of the animals
    const query_2 = "Make list of all the animals in the following JSON object";

    //Make the list of animals
    response = await openai.chat.completions.create({
        model: 'gpt-4-turbo',
        messages: [{"role": "user", "content": query_2 + " "
                + response.choices[0].message.content}],
        max_tokens: 300
    })

    console.log(`The animals are: \n${response.choices[0].message.content}`);

    // The prompt to generate the image
    const imagePrompt = `Make an image in the style of ${selectedStyle} of the 
        following animals: ${response.choices[0].message.content}`;

    const imageResponse = await openai.images.generate({
        model: 'dall-e-3',
        prompt: imagePrompt,
        n: 1,
        size: "1024x1024"
    })
    console.log("Get the generated image at the following URL: ");
    console.log(imageResponse.data[0].url);
}

const promptUser = async () => {
    let selectedStyle;
    console.log('Choose an image style according to its number:');
    imageStyles.forEach((imageStyle, index) => {
        console.log(`${index + 1}. ${imageStyle}`);
    });

    rl.question('Enter your choice (1-5): ', (answer) => {
        const choice = parseInt(answer);

        if (isNaN(choice) || choice < 1 || choice > imageStyles.length) {
            console.log('Invalid choice. Please enter a number between 1 and 5.');
            promptUser();
        } else {
            selectedStyle = imageStyles[choice - 1];
            console.log(`You selected ${selectedStyle}, generating image...`);
            rl.close();
            generateImage(selectedStyle);
        }
    });
};

promptUser();



