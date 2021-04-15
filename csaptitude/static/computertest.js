const Timer = (function() {
    const TEST_LENGTH = 1800; // test length in seconds, 30 min = 1800 sec

    // Time at start of test in seconds.
    // Note: getTime is no. of milliseconds elapsed from date object
    var startPoint;

    function checkTime()
    {
        const constdownEl = document.getElementById("countdown");
        const remainingSecs = TEST_LENGTH -
            (Date.now() - startPoint) / 1000;

        if (remainingSecs <= 0)
        {
            //GetScore(false);
            // window.alert("End of Test.\nYou can continue if you wish, " +
            //     "but please note your score now.");
            constdownEl.innerHTML = "0 minutes  0 seconds";
            //document.testForm.submit();
            document.testForm.dispatchEvent(new Event("submit"));
        }
        else
        {
            constdownEl.innerHTML =
                Math.floor(remainingSecs / 60) + " minutes  " +
                Math.floor(remainingSecs % 60) + " seconds";

            setTimeout(checkTime, 1000);
        }
    }

    return {
        "start": function() {
            startPoint = Date.now();
            checkTime();
        },

        "elapsedMsec": function() {
            return (Date.now() - startPoint);
        },

        "remainingMsec": function() {
            return TEST_LENGTH * 1000 - (Date.now() - startPoint);
        }
    };
}());

const images = [];
images.length = 10;

// array of 29 items (3 examples + 26 questions).
const Questions = Object.freeze([
    //EXAMPLE QUESTIONS
    {
        "Question": "<p>Grace thought of a number, added 7, multiplied by 3, took away 5 and divided by 4 to give an answer of 7.</p><p>What was her starting number?</p>",
        "Choices": [
            "2",
            "3",
            "4",//Correct Answer
            "5",
            "6",
            "7"
        ],
        "Correct": 2 // index of correct answer (start with 0)
    },

    {
        "image": "computer_test_spreadsheet.png",
        "Question": "<p>(<strong><em>Look at the image above.</em></strong>)<br />In this type of question, the coordinates (e.g. A1) refer to the number in the square (e.g., A1 = 9).</p><p>What is B1 + C2?</p>",
        "Choices": [
            "10", //Correct Answer
            "11",
            "12",
            "13",
            "14",
            "None of these"
        ],
        "Correct": 0
    },

    {
        "image": "computer_test_spreadsheet.png",
        "Question": "<strong><em>The timed test will begin after this question.</em></strong><br />In these questions, the coordinates (e.g. A1) of a square refer to the number in the square.<br />Multiply A1 by B2. Put the result in E1.<br />Now divide E1 by D4.<br /><br />What is the answer?",
        "Choices": [
            "1",
            "2",
            "3",
            "4",
            "5",
            "None of these" //Correct Answer
        ],
        "Correct": 5
    },

    //PROPER TEST QUESTIONS

    //1
    {
        "image": "computer_test_syntax_checking.png",
        "Question": "Above are 6 rows containing two identical sets of characters, but in one row, one character in the two sets is different.<br /><br />Which row has the difference?",
        "Choices": [
            "1",
            "2",//Correct Answer
            "3",
            "4",
            "5",
            "6"
        ],
        "Correct": 1
    },

    //2
    {
        "image": "computer_test_syntax_2.png",
        "Question": "Above are 6 rows containing two identical sets of characters, but in one row, one character in the two sets is different.<br /><br />Which row has the difference?",
        "Choices": [
            "1",
            "2",
            "3",
            "4",
            "5",//Correct Answer
            "6"
        ],
        "Correct": 4
    },

    //3
    {
        "image": "computer_test_syntax_3.png",
        "Question": "Above are 6 rows containing two identical sets of characters, but in one row, one character in the two sets is different.<br /><br />Which row has the difference?",
        "Choices": [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6"//Correct Answer
        ],
        "Correct": 5
    },

    //4
    {
        "Question": "Alan thinks of a number.<br />He squares it, then takes away 5, next multiplies it by 4, takes away 7, divides it by 3 and finally adds 6.<br />His answer is 9.<br /><br />What number did Alan start with?",
        "Choices": [
            "1",
            "2",
            "3",//Correct Answer
            "4",
            "5",
            "6"
        ],
        "Correct": 2
    },

    //5
    {
        "Question": "If the hour hand of a clock is turned anticlockwise from 2 pm to 9 am, through how many degrees will it have turned?",
        "Choices": [
            "120",
            "135",
            "150",//Correct Answer
            "165",
            "180",
            "205"
        ],
        "Correct": 2
    },

    //6
    {
        "image": "computer_test_triangles.svg",
        "Question": "What percentage of this shape is blue (to nearest percent)?",
        "Choices": [
            "60",
            "63",//Correct Answer
            "66",
            "69",
            "72",
            "75"
        ],
        "Correct": 1
    },

    //7
    {
        "image": "computer_test_alphabet.svg",
        "Question": "If ADD = 9, BAD = 7, and CAD = 8,<br /><br />what is the value of ADA?",
        "Choices": [
            "3",
            "4",
            "5",
            "6",//Correct Answer
            "7",
            "8"
        ],
        "Correct": 3
    },

    //8
    {
        "image": "computer_test_alphabet.svg",
        "Question": "If BAD = 10, DAC = 11, and CGI = 22,<br /><br />what is the value of OCCAM?",
        "Choices": [
            "35",
            "36",
            "37",
            "39",
            "40",//Correct Answer
            "None of these"
        ],
        "Correct": 4
    },

    //9
    {
        "image": "computer_test_alphabet.svg",
        "Question": "If DATA = 52, CACHE = 40 and BIT = 62,<br /><br />what is the value of BABBAGE?",
        "Choices": [
            "40",//Correct Answer
            "41",
            "42",
            "43",
            "44",
            "None of these"
        ],
        "Correct": 0
    },

    //10
    {
        "Question": "You are facing North. Turn 90 degrees left. Turn 180 degrees right.<br />Reverse direction. Turn 45 degrees left. Reverse direction. Turn 270 degrees right.<br /><br />In which direction are you now facing?",
        "Choices": [
            "N",
            "W",
            "SE",
            "SW",
            "NW",//Correct Answer
            "None of these"
        ],
        "Correct": 4
    },

    //11
    {
        "image": "computer_test_flight_tickets.svg",
        "Question": "What would the code be for a flight to Paris at 5am for a vegetarian 8 year old girl traveling economy class?",
        "Choices": [
            "bYkR",
            "bykr",
            "bykR",//Correct Answer
            "BykP",
            "aykR",
            "None of these"
        ],
        "Correct": 2
    },

    //12
    {
        "Question": "Three computers were lined up in a row. The Dell (D) was to the left of the Viglen (V) but not necessarily next to it. The blue computer was to the right of the white computer. The black computer was to the left of the Hewlett Packard (HP) PC. The Hewlett Packard was to the left of the Viglen (V).<br /><br />What was the order of the computers from left to right?",
        "Choices": [
            "V, HP, D",
            "V, D, HP",
            "HP, D, V",
            "HP, V, D",
            "D, V, HP",
            "D, HP, V"//Correct Answer
        ],
        "Correct": 5
    },

    //13
    {
        "Question": "Tim was given a large bag of sweets and ate one third of the sweets before stopping as he was feeling sick.<br />The next day he ate one third of the remaining sweets and the following day he ate one third of the remainder, before counting the sweets he had left which totaled eight.<br /><br />How many sweets was he given in the beginning?",
        "Choices": [
            "18",
            "21",
            "24",
            "27",//Correct Answer
            "30",
            "33"
        ],
        "Correct": 3
    },

    //14
    {
        "Question": "In a counting system used by intelligent apes.<br />A banana = 1<br />6 is represented by an orange and 2 bananas<br />An orange is worth half a mango<br /><br />What is the value of two mangos, an orange and a banana?",
        "Choices": [
            "21",//Correct Answer
            "24",
            "27",
            "30",
            "33",
            "36"
        ],
        "Correct": 0
    },

    //15
    {
        "Question": "In a counting system used by intelligent apes, a banana = 1<br />6 is represented by an orange and 2 bananas<br />An orange is worth half a mango<br /><br />What is the value in fruit, of two mangos with an orange, divided by an orange with a banana?",
        "Choices": [
            "A mango",
            "A banana",
            "An orange",//Correct Answer
            "2 bananas",
            "3 bananas",
            "Orange & banana"
        ],
        "Correct": 2
    },

    //16
    {
        "image": "computer_test_alphabet.svg",
        "Question": "If the code for JAVA is LCXC,<br />what is the code for BASIC?",
        "Choices": [
            "CBTJD",
            "DCUKE",//Correct Answer
            "EDVLF",
            "FEWMG",
            "CDFFG",
            "None of these"
        ],
        "Correct": 1
    },

    //17
    {
        "image": "computer_test_alphabet.svg",
        "Question": "If the code for FORTRAN is GMUPWUU,<br />what is the code for PASCAL?",
        "Choices": [
            "QYVYFG",
            "QCVGFR",
            "QCPGVR",
            "GMPGFR",
            "QCVXFF",
            "None of these"//Correct Answer
        ],
        "Correct": 5
    },

    //18
    {
        "image": "computer_test_alphabet.svg",
        "Question": "If the code for PHP is QLY.<br />What is the code for SQL?",
        "Choices": [
            "TUU",//Correct Answer
            "TUS",
            "TRM",
            "TUB",
            "VUS",
            "None of these"
        ],
        "Correct": 0
    },

    //19
    {
        "image": "computer_test_grid.svg",
        "Question": "You start in square E6 facing East. Move 3 squares forward.<br />Turn 90 degrees clockwise, move two squares forward, turn 180 degrees anticlockwise.<br />Move 5 squares forward, turn 90 degrees anticlockwise.<br />Move 4 squares forwards, turn 90 degrees clockwise.<br />Move two squares backwards.<br />What is the Y COORDINATE of the square you are now in?",
        "Choices": [
            "6",
            "7",//Correct Answer
            "8",
            "9",
            "10",
            "11"
        ],
        "Correct": 1
    },

    //20
    {
        "image": "computer_test_grid.svg",
        "Question": "You start in square E6 facing South West. Move three squares forward.<br />Rotate 135 degrees clockwise. Move 4 squares forward.<br />Rotate 45 degrees clockwise. Move 2 squares forward.<br />Rotate 90 degrees anticlockwise and move 4 squares backwards.<br /><br />What is the X Coordinate of the square you are now in?",
        "Choices": [
            "C",
            "D",
            "E",
            "F",
            "G",
            "H"//Correct Answer
        ],
        "Correct": 5
    },

    //21
    {
        "Question": "What is the angle between the hands of a clock at 10:30?",
        "Choices": [
            "75",
            "90",
            "105",
            "120",
            "135",//Correct Answer
            "150"
        ],
        "Correct": 4
    },

    //22
    {
        "image": "computer_test_chocolate.png",
        "Question": "What percentage weight of chocolate out of the original kilogram will be contained in COMPLETELY FILLED boxes (i.e. those containing a full 6 bags)?",
        "Choices": [
            "58%",//Correct Answer
            "60%",
            "62%",
            "64%",
            "66%",
            "68%"
        ],
        "Correct": 0
    },

    //23
    {
        "image": "computer_test_spreadsheet.png",
        "Question": "In these questions, the coordinates of the square or cell refer to its contents.<br /><br />What is A4 multiplied by D3 divided by C2?",
        "Choices": [
            "24",
            "26",//13 x 6 = 78 Ã· 3 = 26 //Correct Answer
            "28",
            "30",
            "33",
            "None of these"
        ],
        "Correct": 1
    },

    //24
    {
        "image": "computer_test_spreadsheet.png",
        "Question": "Store the answer to B4  plus  A2  in  F1.<br />Store the answer to  A4  minus  D2  in  F3<br />Multiply  F1  by  F3.<br /><br />What is the final answer?",
        "Choices": [
            "17",
            "84",
            "96",
            "104",
            "108",
            "None of these" //Correct Answer B4 + A2 = 9 + 8 = 17. 13 - 7 = 6. 17 x 6 = 102
        ],
        "Correct": 5
    },

    //25
    {
        "image": "computer_test_spreadsheet.png",
        "Question": "STEP 1: Multiply C3 by D4 and store the result in F4<br />STEP 2: Multiply F4 by 3, store the result in F4 then add 1 to E3.<br />STEP 3: Repeat STEP 2 until the value of E3 equals 3 then stop.<br /><br />What is the value of F4?",
        "Choices": [
            "45",
            "345",
            "405",//Correct Answer 5 x 3 = 15. 15 x 3 = F4 = 45 & E3 = 1. 45 x 3 = 135 & E3 = 2. 135 x 3 = 405 & E3 = 3. STOP. F4 = 405
            "450",
            "1215",
            "None of these"
        ],
        "Correct": 2
    },

    //26
    {
        "image": "computer_test_spreadsheet.png",
        "Question": "Add A1 + B3 + C4 + D2 and put the " +
            "result in E2.<br />" +
            "Add A3 + B1 + C2 + D4 and place the result in E4.<br />" +
            "If the value of E4 is larger than E2 swap their contents, " +
            "otherwise leave them as they are.<br />Multiply E2 by D1, " +
            "then take away A4 and place the result in F2<br /><br />" +
            "What is the value of F2?",
        "Choices": [
            "79",
            "83",//Correct Answer
            "96",
            "95",
            "99",//changed from Kent State due to it being a repeat
            "None of these"
        ],
        "Correct": 1
    },

    //Begin new questions

    //27
    {
        "image": "computer_test_alphabet.svg",
        "Question": "If BOOK = 47,  SEA = 28, and DOG = 29. What is the value of ADDRESS?",
        "Choices": [
            "88",
            "90",
            "82",
            "77", //Correct Answer Here each letter's value is one more than its place in the alphabet. So A = 2, B =  3, C = 4 and so forth. ADDRESS = 2 + 5 + 5 + 19 + 6 + 20 + 20 = 77
            "71",
            "None of these"
        ],
        "Correct": 3
    },

    //28
    {
        "Question": "It is 4 o’clock. What is the measure of the angle formed between the hour hand and the minute hand?",
        "Choices": [
            "90",
            "180",
            "30",
            "60",
            "120", //Correct Answer 3 o'clock is 90 degrees to move to 4 o'clock you add 30 degrees
            "None of these"
        ],
        "Correct": 4
    },

    //29
    {
        "Question": "Three boys were lined up in a row. Dean(D) was to the left of Fred(F) but not necessarily next to him. The blue shirt boy was to the right of the white shirt boy. The black shirt boy was to the left of Henry(H). Henry was to the left of Fred.",
        "Choices": [
            "Henry, Fred, Dean",
            "Fred, Dean, Henry",
            "Dean, Henry, Fred", //Correct Answer
            "Fred, Henry, Dean",
            "Henry, Dean, Fred", 
            "None of these"
        ],
        "Correct": 2
    },

    //30
    {
        "Question": "If an animal is in group A, they are also in group B.<br>If the above statement is true, which of the following statements must also be true?",
        "Choices": [
            "If an animal is in group B, it is also in group A.",
            "If an animal is not in group B, it is not in group A.", //Correct Answer
            "If an animal is not in group A, it is not in group B.",
            "If an animal is in group B, it is not in group A.",
            "If an animal is not in group B, it is in group A.", 
            "None of these"
        ],
        "Correct": 1
    },

    //31
    {
        "Question": "All of Sarah's friends like to swim.<br>If the above statement is true, which of the following statements must also be true?",
        "Choices": [
            "If Jill is not Sarah's friend, then she does not like to swim.",
            "If Laura likes to swim, then she is Sarah's friend.",
            "If Mary likes to swim, then she is not Sarah's friend.",
            "If Amanda is Sarah's friend, then she does not like to swim.",
            "If Maddie does not like to swim, then she is not Sarah's friend.", //Correct Answer
            "None of these"
        ],
        "Correct": 4
    },

]);

// Array to hold the user's test answers.
const Ans = new Array(Questions.length);

// Array to hold the time that the user selected an answer.
const AnsTimes = new Array(Questions.length).fill(0);

var questionStartTime = null;

var num = -1; //when next quest button clicked advances to 0 at start of test

const confirmNavigationAway = (event) => {
    // Cancel the event as stated by the standard.
    event.preventDefault();
    // Chrome requires returnValue to be set.
    event.returnValue = '';
};

function NextQuest()
{
    if (num >= 34) {
        window.alert("That was the last question.  " +
            "Either click on PREVIOUS QUESTION to attempt questions you may " +
            "have missed out, or GET YOUR SCORE if you wish to finish.");
        num = 34;
    }
    else {
        ++num;

        showQuestion(num);

        if (num === 0) {
            // Enable answer buttons
            window.document.testForm.question_1.forEach(function(el){
                el.disabled = false;
            });
        }
        else if (num === 3) {
            // Start the timer.
            Timer.start();
            window.addEventListener('beforeunload', confirmNavigationAway);
        }
    }
}

function PrevQuest()
{
    if (num <= 0)
    {
        window.alert("That was the first example.");
        num = 0;
    }
    else if (num == 3)
    {
        window.alert("That was the first question.");
    }
    else
    {
        --num;
        showQuestion(num);
    }
}

var answerLabels = []; // set on load
var questionDiv = null;

window.addEventListener("DOMContentLoaded", (event) => {
    if (!document.getElementById("testForm")) {
        return;
    }
    answerLabels = [
        document.querySelector(`label[for='choice_1']`),
        document.querySelector(`label[for='choice_2']`),
        document.querySelector(`label[for='choice_3']`),
        document.querySelector(`label[for='choice_4']`),
        document.querySelector(`label[for='choice_5']`),
        document.querySelector(`label[for='choice_6']`)
    ];

    // Add event listeners for radio buttons
    window.document.testForm.question_1.forEach( function(choiceEl){
        choiceEl.addEventListener("change", RecordAnswer);
    });

    questionDiv = document.getElementById("Questionbox");


    // Preload images into images[]
    [
        "computer_test_spreadsheet.png",
        "computer_test_syntax_checking.png",
        "computer_test_syntax_2.png",
        "computer_test_syntax_3.png",
        "computer_test_triangles.svg",
        "computer_test_alphabet.svg",
        "computer_test_flight_tickets.svg",
        "computer_test_grid.svg",
        "computer_test_chocolate.png"
    ].forEach(function(name, index){
        images[index] = new Image(633, 269);//687,305 originally
        images[index].src = "/static/img/" + name;
    });

    // Setup Submit Call
    window.document.testForm.addEventListener("submit", GetScore);

});

// Show the question, radio buttons, and images for the current question.
function showQuestion(num)
{
    const testForm = window.document.testForm;
    const questionNumEl = document.getElementById("questionNum");
    const feedbackEl = document.getElementById("feedbackBox");

    if (num < 3) {
        questionNumEl.innerHTML = `Example ${num + 1} of 3`;
    }
    else {
        questionNumEl.innerHTML = `Question ${num - 2} of 31`;
    }

    // Clear the score box
    feedbackEl.innerHTML = "";

    // puts questions into correct box
    questionDiv.innerHTML = Questions[num].Question;

    answerLabels.forEach(function(label, labIndex) {
        label.innerHTML = Questions[num].Choices[labIndex];
    });

    // display the picture for this question
    if ("image" in Questions[num]) {
        document.slideshow.setAttribute("src", "/static/img/" + Questions[num].image);
        document.slideshow.style.visibility = "visible";
    }
    else {
        document.slideshow.style.visibility = "hidden";
    }

    // Set radio button check state based on previous answer
    var checked = document.querySelector("input[name='question_1']:checked");
    if (typeof Ans[num] !== "undefined") {
        var selectedRadio = testForm.question_1[Ans[num]];
        selectedRadio.checked = true;

        // This function is used to manually fire change events
        // when we programmatically set the answer that the user
        // previously entered.
        // Create a new 'change' event and dispatch it.
        selectedRadio.dispatchEvent(new Event("change"));
    }
    else if (checked) {
         checked.checked = false;
    }

    window.document.testForm.nextquestbutton.value =
        (num < 2 ? "Next Example" :
            (num === 2 ? "Start Test" : "Next Question"));

    // Disable buttons when they result at the beginning or end of text.
    window.document.testForm.prevquestbutton.disabled = num === 3 || num <= 0;
    window.document.testForm.nextquestbutton.disabled = num === 33;
    window.document.testForm.submit.disabled = num < 3;

    questionStartTime = Date.now(); // Note the time on this question.
}

function RecordAnswer()
{
    //EXAMPLES
    if (num === 0 || num === 1 || num === 2) {
        var question_1 = window.document.testForm.question_1;
        const feedbackEl = document.getElementById("feedbackBox");

        if (question_1[Questions[num].Correct].checked) {
            feedbackEl.innerHTML = "<h5 class=\"alert alert-success\">WELL DONE! The answer is &ldquo;" +
                Questions[num].Choices[Questions[num].Correct] + "&rdquo;.</h5>";
        }
        else {
            feedbackEl.innerHTML = "<h5 class=\"alert alert-danger\">Try again.</h5>";
        }

        if (num === 2) {
            feedbackEl.innerHTML +=
                "<strong><em>The test will begin with the next question.</em></strong>";
        }
    }

    // Find and store the answer that has been selected.
    if (num >= 0) {
        window.document.testForm.question_1.forEach(function(radio, index){
            if (radio.checked) {
                Ans[num] = index;
            }
        });

        // Store the elapse time
        const currentTime = Date.now();
        AnsTimes[num] += currentTime - questionStartTime;
        questionStartTime = currentTime; // reset counter so that we don't double count times
    }
}

function GetScore(event)
{
    // Store the elapse time as soon as possible
    window.document.testForm.elapsedTime.value = Timer.elapsedMsec();

    if (Timer.remainingMsec() <= 0 || confirm("Are you sure you wish to finish the test?\nOnce submitted you will not be able to change your answers.")) {
        let totalscore = 0;
        const wrongAns = [];

        // Remove the listener requiring a confirmation to navigate away.
        window.removeEventListener('beforeunload', confirmNavigationAway);

        // remove examples
        const userAns = Ans.slice(3);

        // Get correct answers (without examples)
        const testCorrect = Questions.slice(3).map((quest) => quest.Correct);

        testCorrect.forEach(function(correct, idx) {
            if (userAns[idx] === correct) {
                totalscore += 1;

            }
            else {
                wrongAns.push(idx + 1);
            }
        });

        // Add the word 'and' to the last wrong answer.
        if (wrongAns.length > 0) {
            wrongAns[-1] = "and " + wrongAns[-1];
        }

        // Display score and list of wrong answers
        document.getElementById("feedbackBox").innerHTML = "Your score is " +
            totalscore + ".<br />Wrong and unanswered responses were: " +
            wrongAns.join(", ") + ".";

        window.document.testForm.answers.value = Ans.join(",");
        window.document.testForm.questionTimes.value = AnsTimes.join(",");
        return true;
    }
    else {
        // Don't submit the form
        if (event) {
            event.preventDefault();
        }

        return false;
    }
}