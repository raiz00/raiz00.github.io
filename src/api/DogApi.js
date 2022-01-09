import axios from "axios";

const BASE_URL = "https://dog.ceo/api/"
const NO_QUESTIONS = 5
const NO_QUESTION_OPTIONS = 4

export const API = {
    breeds: BASE_URL + "breeds/list/all",
    image_by_breed: BASE_URL + "breed/",
    random: "/images/random"
}

export async function fetchBreedsList() {
    let res = {
        data: JSON.parse(localStorage.getItem("breeds")),
        msg: null
    }
    if (res.data == null) {
        try {
            let response = await axios(API.breeds)
            let data = Object.keys(response.data.message)
            localStorage.setItem("breeds", JSON.stringify(data))
            res.data = data
        } catch (error) {
            res.msg = "Error: " + error
        }
    }
    return res
}

async function getImageByBreed(breed) {
    let res = {data: null, msg: null}
    try {
        let response = await axios(API.image_by_breed + breed + API.random)
        res.data = response.data.message
    } catch (error) {
        res.msg = "Error: " + error
    }
    return res
}

export async function getQuestions() {
    let res = {data: null, msg: null}
    try {
        let breeds = (await fetchBreedsList()).data
        let randomBreeds = new Set()

        randomNumbers(breeds.length, NO_QUESTIONS * NO_QUESTION_OPTIONS).forEach(i => {
            randomBreeds.add(breeds[i])
        })
        randomBreeds = Array.from(randomBreeds)

        let questions = []
        let numsInd = 0
        for (let i = 0; i < NO_QUESTIONS; i++) {
            // add image and correct answer
            let correctBreed = randomBreeds[numsInd++]
            let question = {
                imageLink: (await getImageByBreed(correctBreed)).data,
                answerOptions: [{answerText: correctBreed, isCorrect: true}]
            }

            // add 3 incorrect options
            for (let j = 1; j < NO_QUESTION_OPTIONS; j++) {
                question.answerOptions.push(
                    {answerText: randomBreeds[numsInd++], isCorrect: false}
                )
            }
            question.answerOptions.sort(() => Math.random() - 0.5)
            questions.push(question)
        }

        res.data = questions
    } catch (error) {
        res.msg = "Error: " + error
    }
    return res
}

const randomNumbers = ((range, count = 5) => {
    const numbers = Array(range).fill().map((_, index) => index);
    numbers.sort(() => Math.random() - 0.5);
    return numbers.slice(0, Math.min(count, numbers.length))
})