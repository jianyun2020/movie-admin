import { validate } from "class-validator";

import { Movie } from "./entities/Movie";


const mv = new Movie();

mv.name = '金刚';
mv.types = ['喜剧'];
mv.areas = ['中国大陆'];
mv.timeLong = 120;
mv.isHot = true;
mv.isClassic = true;
mv.isComing = true; 

validate(mv).then(errors => {
  if (errors.length > 0) {
    console.log("validation failed. errors: ", errors);
  } else {
    console.log("validation succeed");
  }
})