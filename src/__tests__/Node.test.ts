import { Node } from "libs/Node";

test("adds left node", () => {
  const node = new Node(100);
  node.add(50);
  expect(node.left).not.toBeUndefined();
  expect(node.left.value).toBe(50);
});

test("adds right node", () => {
  const node = new Node(100);
  node.add(150);
  expect(node.right).not.toBeUndefined();
  expect(node.right.value).toBe(150);
});

test("adds duplicate node", () => {
  const node = new Node(100);

  expect(() => {
    node.add(100);
  }).toThrowError("DUPLICATE_NODE");
});

test("adds nodes and validates it self", () => {
  const node = new Node(100);
  node.add(90);
  node.add(60);
  node.add(150);
  node.add(80);
  node.add(130);
  node.add(50);
  node.add(70);
  node.add(120);
  node.add(110);
  node.add(160);

  expect(node.validate()).toBe(true);
  expect(node.rightMost().value).toBe(160);
  expect(node.leftMost().value).toBe(50);
  expect(node.depth()).toBe(4);
});

test("searches for nodes", () => {
  const node = new Node(100);
  node.add(90);
  node.add(60);
  node.add(150);
  node.add(80);
  node.add(130);
  node.add(50);
  node.add(70);
  node.add(120);
  node.add(110);
  node.add(160);

  const result = node.search(130);
  expect(result).not.toBeUndefined();
  expect(result.value).toBe(130);

  const badResult = node.search(900);
  expect(badResult).toBeNull();
});

test("removes non-existent node", () => {
  const node = new Node(100);
  node.add(90);
  node.add(60);
  node.add(150);
  node.add(80);
  node.add(130);
  node.add(50);
  node.add(70);
  node.add(120);
  node.add(110);
  node.add(160);

  expect(() => {
    node.remove(900);
  }).toThrowError("NODE_NOT_FOUND");
});
test("removes last node", () => {
  const node = new Node(100);
  node.add(90);
  node.add(60);
  node.add(150);
  node.add(80);
  node.add(130);
  node.add(50);
  node.add(70);
  node.add(120);
  node.add(110);
  node.add(160);

  node.remove(50);
  expect(node.validate()).toBe(true);

  node.remove(160);
  expect(node.validate()).toBe(true);
});

test("removes node has child/children", () => {
  const node = new Node(100);
  node.add(90);
  node.add(60);
  node.add(150);
  node.add(80);
  node.add(130);
  node.add(50);
  node.add(70);
  node.add(120);
  node.add(110);
  node.add(160);

  node.remove(60);
  expect(node.validate()).toBe(true);
});

test("destroys the tree", () => {
  const node = new Node(100);
  node.add(90);
  node.add(60);

  node.remove(100);
  expect(node.validate()).toBe(true);
  node.remove(90);
  expect(node.validate()).toBe(true);

  expect(() => {
    node.remove(60);
  }).toThrowError("SINGLE_NODE_CANNOT_BE_DELETED");
});
