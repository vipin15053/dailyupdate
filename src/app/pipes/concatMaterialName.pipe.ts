/**
 * Created By : Vipin Yadav
 */

import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "concatMaterialName"
})
export class ConcateMaterialName implements PipeTransform {
  transform(value: any, args?: any): any {
    const data = value;
    if (data && data.length !== 0) {
      let concatName = "";
      data.map(item => {
        if (concatName === "") {
          concatName = item.materialName;
        } else {
          concatName += " ," + item.materialName;
        }
      });
      if (concatName.length >= args) {
        return concatName.slice(0,args)+"...."
      }
      return concatName;
    }
    return;
  }
}

/**
 * Created By : Vipin Yadav
 */
