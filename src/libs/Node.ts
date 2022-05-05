export class Node {
  value: number;
  left?: Node;
  right?: Node;
  parent: Node | null;

  constructor(value: number, parent: Node | null = null) {
    this.value = value;
    this.parent = parent;
  }

  toString = () =>
    JSON.stringify(
      this,
      (key, value) => {
        if (key === "parent") {
          return value === null ? null : '#';
        }
        return value;
      },
      2
    );

  validate = (): boolean => {
    let rightTest = true;
    if (this.right !== undefined) {
      if (this.value > this.right.value) {
        return false;
      }
      rightTest = this.right.validate();
    }

    let leftTest = true;
    if (this.left !== undefined) {
      if (this.value < this.left.value) {
        return false;
      }
      leftTest = this.left.validate();
    }

    return rightTest && leftTest;
  };

  add = (value: number) => {
    if (value === this.value) {
      throw new Error("DUPLICATE_NODE");
    }

    if (value > this.value) {
      if (this.right === undefined) {
        this.right = new Node(value, this);
      } else {
        this.right.add(value);
      }
    } else if (value < this.value) {
      if (this.left === undefined) {
        this.left = new Node(value, this);
      } else {
        this.left.add(value);
      }
    }

    return this;
  };

  search = (value: number): Node | null => {
    if (value === this.value) {
      return this;
    }

    if (this.right !== undefined && value > this.value) {
      return this.right.search(value);
    }

    if (this.left !== undefined && value < this.value) {
      return this.left.search(value);
    }

    return null;
  };

  leftMost = (): Node | undefined => {
    return this.left?.leftMost() || this.left;
  };

  rightMost = (): Node | undefined => {
    return this.right?.rightMost() || this.right;
  };

  remove = (value: number) => {
    const Node = this.search(value);

    if (Node === null) {
      throw new Error("NODE_NOT_FOUND");
    }

    if (Node.left !== undefined) {
      const NodeRightMost = Node.left.rightMost();
      if (NodeRightMost === undefined) {
        const value = Node.left.value;
        Node.remove(value);
        Node.value = value;
      } else {
        const value = NodeRightMost?.value!;
        Node.remove(value);
        Node.value = value;
      }
    } else if (Node.right !== undefined) {
      const NodeLeftMost = Node.right.leftMost();
      if (NodeLeftMost === undefined) {
        const value = Node.right.value;
        Node.remove(value);
        Node.value = value;
      } else {
        const value = NodeLeftMost?.value!;
        Node.remove(value);
        Node.value = value;
      }
    } else {
      if (Node.parent === null) {
        throw new Error("SINGLE_NODE_CANNOT_BE_DELETED");
      }

      if (Node.value > Node.parent.value) {
        delete Node.parent.right;
      } else {
        delete Node.parent.left;
      }
    }

    return this;
  };

  depth = (currentDepth = 0): number => {
    let leftDepth = 0;
    if (this.left !== undefined) {
      leftDepth = this.left.depth(currentDepth + 1);
    }
    let rightDepth = 0;
    if (this.right !== undefined) {
      rightDepth = this.right.depth(currentDepth + 1);
    }

    return Math.max(currentDepth, Math.max(leftDepth, rightDepth));
  };
}

