import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupByPipe'
})
export class GroupByPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
