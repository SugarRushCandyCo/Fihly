const questions = [

    {
        title: "Welcome to Fihly",
        description: "Let's build your fishing profile.",
        type: "welcome",
    },


    {
        title: "What's your name?",
        description: "We'll use this for your fishing profile.",
        type: "text",
        key: "name"
    },


    {
        title: "Please enable location services",
        description: "Fihly uses your location for weather, conditions, and nearby fishing.",
        type: "location",
        key: "location"
    },


    {
        title: "What fish do you target?",
        description: "Choose all that apply.",
        type: "multiple",
        key: "fish",
        options:[
            "Bass",
            "Trout",
            "Salmon",
            "Catfish",
            "Walleye",
            "Pike",
            "Bluegill",
            "Saltwater"
        ]
    },


    {
        title:"How do you usually fish?",
        description:"Select your favorite styles.",
        type:"multiple",
        key:"style",
        options:[
            "Shore Fishing",
            "Boat Fishing",
            "Kayak Fishing",
            "Fly Fishing",
            "Ice Fishing"
        ]
    },


    {
        title:"You're ready!",
        description:"Your Fihly profile has been created.",
        type:"finish"
    }

];



let currentQuestion = 0;


let answers = JSON.parse(localStorage.getItem("fihlyProfile")) || {};



const title = document.getElementById("questionTitle");
const description = document.getElementById("questionDescription");
const answerBox = document.getElementById("answers");

const nextButton = document.getElementById("nextButton");
const backButton = document.getElementById("backButton");

const progress = document.getElementById("progressBar");



function loadQuestion(){


    let q = questions[currentQuestion];


    title.innerHTML = q.title;

    description.innerHTML = q.description;


    answerBox.innerHTML = "";



    progress.style.width =
    ((currentQuestion) / (questions.length - 1) * 100) + "%";



    backButton.style.display =
    currentQuestion === 0 ? "none" : "block";



    nextButton.innerHTML =
    currentQuestion === questions.length - 1
    ? "Finish"
    : "Continue";





    // TEXT INPUT

    if(q.type === "text"){


        let input = document.createElement("input");

        input.className="answer";

        input.placeholder="Your name";


        input.value = answers[q.key] || "";


        input.oninput = ()=>{

            answers[q.key] = input.value;

        };


        answerBox.appendChild(input);

    }





    // MULTIPLE CHOICE


    if(q.type === "multiple"){


        q.options.forEach(option=>{


            let button=document.createElement("div");


            button.className="answer";


            button.innerHTML=option;



            if(
                answers[q.key] &&
                answers[q.key].includes(option)
            ){

                button.classList.add("selected");

            }




            button.onclick=()=>{


                if(!answers[q.key]){

                    answers[q.key]=[];

                }



                if(
                    answers[q.key].includes(option)
                ){

                    answers[q.key]
                    =
                    answers[q.key]
                    .filter(x=>x!==option);


                    button.classList.remove("selected");


                }
                else{


                    answers[q.key].push(option);


                    button.classList.add("selected");


                }


            };


            answerBox.appendChild(button);


        });

    }





    // LOCATION


    if(q.type==="location"){


        let button=document.createElement("div");


        button.className="answer";


        button.innerHTML="📍 Allow Location";



        button.onclick=()=>{


            navigator.geolocation.getCurrentPosition(

                ()=>{

                    answers.location=true;

                    button.innerHTML="✓ Location Enabled";

                },


                ()=>{

                    answers.location=false;

                    button.innerHTML="Location Denied";

                }

            );


        };


        answerBox.appendChild(button);


    }




    // WELCOME


    if(q.type==="welcome"){

        let text=document.createElement("div");

        text.className="answer";

        text.innerHTML="🎣 Start your fishing profile";

        answerBox.appendChild(text);

    }





    // FINISH


    if(q.type==="finish"){


        localStorage.setItem(
            "fihlyProfile",
            JSON.stringify(answers)
        );


        nextButton.innerHTML="Start Fishing";


    }



}




nextButton.onclick=()=>{


    if(currentQuestion === questions.length-1){


        localStorage.setItem(
            "fihlyProfile",
            JSON.stringify(answers)
        );


        window.location.href="/";


        return;

    }



    currentQuestion++;


    loadQuestion();


};





backButton.onclick=()=>{


    if(currentQuestion>0){

        currentQuestion--;

        loadQuestion();

    }

};




loadQuestion();
