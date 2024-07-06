import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";

export class BaseEntities {
  /**
   * 验证当前对象
   */
  public async validateThis(skipMissingProperties = false): Promise<string[]> {
    const errors = await validate(this, {
      skipMissingProperties,
    });
    const temp = errors.map(e => {
      if (e.constraints) {
        return Object.values(e.constraints)
      }
      return []
    });

    const result: string[] = [];
    temp.forEach(t => {
      result.push(...t)
    })
    return result
  }

    /**
   * 将一个平面对象转换为类的对象
   * @param plainObject 平面对象
   * @returns 
   */
    protected static baseTransform<T>(cls: ClassConstructor<T>, plainObject: object): T {
      if (plainObject instanceof cls) {
        return plainObject
      }
      return plainToClass(cls, plainObject)
    }
}