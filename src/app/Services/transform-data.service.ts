import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TransformDataService {
  constructor() {}

  transformData(data: any): any[] {
    interface Node {
      id: number | string;
      name: string;
      children?: {
        $values: Node[];
      };
    }

    const rootValues: Node[] = data || [];

    const transformNode = (node: Node) => {
      const newNode: any = {
        key: String(node.id),
        label: node.name,
      };

      if (
        node.children &&
        node.children.$values &&
        node.children.$values.length > 0
      ) {
        newNode.children = node.children.$values.map((child) =>
          transformNode(child)
        );
      }
      return newNode;
    };

    return rootValues.map((node) => transformNode(node));
  }
}
