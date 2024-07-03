import { validate } from "class-validator";

import { Movie } from "./entities/Movie";
import { plainToClass } from "class-transformer";


const mv: any = {}; // plain Object

mv.name = 2222;
mv.types = ["22"];
mv.areas = [1];
mv.timeLong = 120;
mv.isHot = true;
mv.isClassic = true;
mv.isComing = true; 
mv.test = 1;

// 将plain Object 转换成 Movie 的对象

const movie = plainToClass(Movie, mv as object);

console.log(movie);

validate(movie).then(errors => {
  if (errors.length > 0) {
    console.log("validation failed. errors: ", errors);
  } else {
    console.log("validation succeed");
  }
})