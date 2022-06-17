import { Component, Input, OnInit } from '@angular/core';
import { APIQuestion } from 'src/shared/api/trivia-questions.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TriviaQuestionDataService } from 'src/app/game-settings/trivia-question-data.service';
import { Player } from 'src/shared/api/player.module';
import { MoveDirection, ClickMode, HoverMode, OutMode, Container, Engine, Opacity } from "tsparticles-engine";
import { loadFull } from "tsparticles";

@Component({
  selector: 'app-game-card-component',
  templateUrl: './game-card-component.component.html',
  styleUrls: ['./game-card-component.component.css'],
   animations: [
    trigger('flipState', [
      state('showBack', style({
        transform: 'rotateY(179deg)'
      })),
      state('showFront', style({
        transform: 'rotateY(0)'
      })),
      transition('showBack => showFront', animate('500ms ease-out')),
      transition('showFront => showBack', animate('500ms ease-in'))
    ])
  ]
})
export class GameCardComponentComponent implements OnInit {
  // @Input() questionArray: APIQuestion;
  flip: string = 'showFront';  //'showFront'
  questions: APIQuestion[] = [];
  currentQuestionIndex: number = 0;
  gameOver:boolean = false;
  winners: Player[];
  id = "tsparticles";

  constructor(private triviaQuestionDataService: TriviaQuestionDataService) { }

  ngOnInit(): void {
    this.questions = this.triviaQuestionDataService.getCurrentTriviaQuestions();
  }

  onNextQuestion() {
    // remember the current index
    const tempQuestionIndex = this.currentQuestionIndex;
    //set the cur index to -1 so no question text appears
    this.currentQuestionIndex = -1;
    //rotate card back to the front
    this.onRotateCard()
    // wait 1 second for the card to flip, then move to next question
    setTimeout(() => {
      // increment the index of the current question if needed
      if (tempQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex = tempQuestionIndex + 1;
      }
    }, 500);
  }



  onShowWinner() {
    // get list of winners
    // do something spectacular
    this.winners = this.triviaQuestionDataService.getWinner();
    this.gameOver = !this.gameOver;

  }

  onRotateCard() {
    // console.log('flipping');
    this.flip = (this.flip == 'showFront') ? 'showBack' : 'showFront';
  }

  onClose(){
    this.gameOver = !this.gameOver;
  }


// THIS SECTION IS FOR THE CONFETTI - BEGIN
  StartFireworks() {

   }



  particlesOptions = {
    detectRetina: true,
  background: {
    color: "#000",
    Opacity: 0.25
  },
  fpsLimit: 60,
  emitters: {
    direction: "top",
    autoplay: false,
    life: {
      count: 0,
      duration: 0.1,
      delay: 0.1
    },
    rate: {
      delay: 0.01,
      quantity: 1
    },
    size: {
      width: 100,
      height: 0
    },
    position: {
      y: 100,
      x: 50
    }
  },
  particles: {
    number: {
      value: 0
    },
    destroy: {
      mode: "split",
      split: {
        count: 1,
        factor: { value: 1 / 3 },
        rate: {
          value: 100
        },
        particles: {
          color: {
            value: ["#5bc0eb", "#fde74c", "#9bc53d", "#e55934", "#fa7921"]
          },
          stroke: {
            width: 0
          },
          number: {
            value: 0
          },
          collisions: {
            enable: false
          },
          opacity: {
            value: 1,
            animation: {
              enable: true,
              speed: 0.6,
              minimumValue: 0.1,
              sync: false,
              startValue: "max",
              destroy: "min"
            }
          },
          shape: {
            type: "circle"
          },
          size: {
            value: { min: 2, max: 3 },
            animation: {
              enable: false
            }
          },
          life: {
            count: 1,
            duration: {
              value: {
                min: 1,
                max: 2
              }
            }
          },
          move: {
            enable: true,
            gravity: {
              enable: false
            },
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            outMode: "destroy"
          }
        }
      }
    },
    life: {
      count: 1
    },
    shape: {
      type: "line"
    },
    size: {
      value: { min: 1, max: 100 },
      animation: {
        enable: true,
        sync: true,
        speed: 150,
        startValue: "random",
        destroy: "min"
      }
    },
    stroke: {
      color: {
        value: "#303030"
      },
      width: 1
    },
    rotate: {
      path: true
    },
    move: {
      enable: true,
      gravity: {
        acceleration: 15,
        enable: true,
        inverse: true,
        maxSpeed: 100
      },
      speed: { min: 10, max: 20 },
      outModes: {
        default: "destroy",
        top: "none"
      },
      trail: {
        fillColor: "#000",
        enable: true,
        length: 10
      }
    }
  }
  };

  particlesLoaded(container: Container): void {
    // console.log(container);
    // console.log('Fireworks container loaded');
  }

  async particlesInit(engine: Engine): Promise<void> {
    // console.log(engine);
    // console.log('Fireworks engine started');

    // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
    }

// THIS SECTION IS FOR THE CONFETTI - END


}
