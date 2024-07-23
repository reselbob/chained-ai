# Chained AI
This projects demonstrates how to chain responses from the OpenAI API to a meaningful result.

# Overview

The project will generate an image using OpenAI based on the animals mentioned in the Shakespeare plays Othello and A Winter's Tale. 

The code asks the user to declare a graphic style, and then uses the OpenAI API to generate an image of the animals in that style.

The code will return a URL to the image for viewing.

Here is an example of a generated image:

![generated-image](https://github.com/user-attachments/assets/c8d81746-054d-4a1e-866e-6ab9912b90f5)


# System Requirements

The code requires that the user has an OpenAI API key. The key should be stored in a file called `.env` in the root directory of the project. The `.env` file should contain the following line:

```
OPENAI_API_KEY=<your-api-key>
```

Go here to learn how to get an API key: https://beta.openai.com/docs/developer-quickstart/overview

Also, the host computer needs to running a version of Node.js. Go here to learn how to install Node.js: https://nodejs.org/en/download/

# How to Run the Code

Clone the code from GitHub

```bash
git clone https://github.com/reselbob/chained-ai.git
```

Then change to the directory where the code is located:

```bash
cd chained-ai
```

Next, install the dependencies:

```bash
npm install
```

Finally, run the code:

```bash
node index.js
```


