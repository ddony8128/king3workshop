const question = ["이모티콘을 평소에 많이 쓰는 편이다?",
                "나는 귀여움이라면 사족을 못 쓴다?",
                "친구들 사이에서 나는?",
                "내일 생일인 친구에게 당장 선물을 준비해줘야 한다면?"
                ];
const answer = {
              choice: [["이모티콘 러버. 거의 아무 때나, 누구에게나 쓴다.",
                  "어느 정도 친한 사람들에게만 쓴다.",
                  "가끔 감정이 풍부할 때만 쓴다.",
                  "이모티콘 같은 거 쓰지 않아도 말로 표현하면 충분하다."],
              [   "귀여운 게 최고!",
                  "좋아한다.",
                  "별 생각 없는 편이다.",
                  "귀여운 것보다 다른 매력이 더 눈에 띈다."],
              [   "기꺼이 망가지며 웃겨주는 광대 역할을 한다.",
                  "항상 새롭게 갈 곳이나 놀 거리를 제안한다.",
                  "세심하게 다른 친구를 챙겨주거나 이야기를 잘 들어준다.",
                  "조용하고 얌전히 있는다."],
              [   "입 싹 닫고 조용히 넘어간다.",
                  "돌직구로 뭐 갖고 싶냐고 물어본다.",
                  "적당히 축하인사와 치킨 기프티콘 정도?",
                  "내일 당장은 못 주는 한이 있어도 정성 가득 담긴 선물을 준비한다."]] ,
              score: [[ [0, 0, 10, 20],
                        [0, 20, 0, 0],
                        [0, -20, 20, 0],
                        [0, -20, 20, -20]
              ],[       [40, 0, 0, 0],
                        [15, 0, 0, 0],
                        [0, 0, -10, 10],
                        [0, 10, 10, 0]
              ],
              [         [-10, 40, -20, 20],
                        [0, 0, 20, 20],
                        [0, 0, 0, -20],
                        [0, -20, 0, -20]
              ],
              [         [-10, 20, -20, 0],
                        [0, 10, 0, 30],
                        [10, 0, -20, -20],
                        [0, 0, 20, 10]
              ]]
};
let parameter ={
  num: [ 50, 50, 50, 50 ], //귀여움, 웃김, 퀄리티, 보편적/아이디어
  evaluate: function(offset){
    this.num[0] = this.num[0] + offset[0];
    this.num[1] = this.num[1] + offset[1];
    this.num[2] = this.num[2] + offset[2];
    this.num[3] = this.num[3] + offset[3];
  }
}
const FINAL = 4;
let count = 0;
let selected = 0;

function changeSelect(self){
  selected = self.value;
}

function evaluateParameter(){
  if (count===0){
    return;
  }
  if (selected===0){
    alert("뭐라도 골라주시죠!");
  }
  offset = answer.score[count-1][selected-1];
  parameter.evaluate(offset);
}

function evaluateResult(){
  if (parameter.num[0] > 80){
    if (parameter.num[1] > 90){
      return "./result/result4.html";
    }
    return "./result/result6.html";
  }
  if (parameter.num[1] > 100){
    if (parameter.num[2] > 50){
      return "./result/result2.html";
    }
    return "./result/result7.html";
  }
  if (parameter.num[0] > 60){
    if (parameter.num[1] > 60){
      if(parameter.num[3] > 80){
        return "./result/result1.html";
      }
      return "./result/result8.html";
    }
    if (parameter.num[2] > 50){
      return "./result/result3.html";
    }
  }
  return "./result/result5.html";
}

function setAsk(){
  evaluateParameter();
  if (count===FINAL){
    const result = evaluateResult();
    location.href = result;
    return;
  }
  else if (count===(FINAL-1)){
    document.querySelector("#next").value="결과 확인";
  }
  else {
    document.querySelector("#next").value="다음";
  }
  document.querySelector("#question").innerHTML = question[count];
  document.querySelector("#answer1").innerHTML = answer.choice[count][0];
  document.querySelector("#answer2").innerHTML = answer.choice[count][1];
  document.querySelector("#answer3").innerHTML = answer.choice[count][2];
  document.querySelector("#answer4").innerHTML = answer.choice[count][3];
  if (document.querySelector("input:checked")){
      document.querySelector("input:checked").checked = false;
  }

  selected = 0;
  count = count + 1;
  return;
}

setAsk();
