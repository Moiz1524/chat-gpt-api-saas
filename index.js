const OpenAI = require("openai")
const { Configuration, OpenAIApi } = OpenAI

const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const port = 5000

const configuration = new Configuration({
  organization: "<place-your-organization-key-here>",
  apiKey: "<place-your-secret-key-here>"
});

const openai = new OpenAIApi(configuration);

app.use(bodyParser.json())
app.use(cors())

app.post("/", async (req, res) => {
  const { message } = req.body
  
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${message}`,
    max_tokens: 7,
    temperature: 0,
  });

  if (response.data.choices[0].text) {
    res.json({
      message: response.data.choices[0].text
    })
  }
})

app.listen(port, () => {
  console.log(`Server is listening on ${port}`)
})