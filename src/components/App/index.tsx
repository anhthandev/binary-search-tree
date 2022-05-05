import { useState } from "react";
import { Node } from "libs/Node";
import styles from "./styles.module.css";
import { Tree, TreeNode as BaseTreeNode } from "react-organizational-chart";

type TreeNodeProps = {
  node: Node;
  onDelete: (node: Node) => void;
};
export const TreeNode = ({ node, onDelete }: TreeNodeProps) => {
  const Component = node.parent === null ? Tree : BaseTreeNode;

  const children = [];
  let totalEmpty = 0;
  if (node.left !== undefined) {
    children.push(
      <TreeNode key={node.left.value} onDelete={onDelete} node={node.left} />
    );
  } else {
    totalEmpty++;
    children.push(<BaseTreeNode className={styles.hidden} key={`${node.value}_left`} label="" />);
  }
  if (node.right !== undefined) {
    children.push(
      <TreeNode key={node.right.value} onDelete={onDelete} node={node.right} />
    );
  } else {
    totalEmpty++;
    children.push(<BaseTreeNode className={styles.hidden} key={`${node.value}_right`} label="" />);
  }

  if (totalEmpty === 2) {
    children.length = 0;
  }

  return (
    <Component
      label={<button title="Click to remove me!" onClick={() => onDelete(node)}>{node.value}</button>}
    >
      {children}
    </Component>
  );
};

const randomValue = () => Math.floor(Math.random() * 1000);

export const App = () => {
  const [tree, setTree] = useState<Node>(new Node(randomValue()));

  return (
    <div>
      <div style={{
        textAlign: 'center',
      }}>
        <button
          onClick={() => {
            let newValue = randomValue();
            while (tree.search(newValue) !== null) {
              newValue = randomValue();
            }
            tree.add(newValue);
            setTree({ ...tree });
          }}
        >
          Add node
        </button>
        {` `}
        <button
          onClick={() => {
            const newTree = new Node(randomValue())
            for (let i = 0; i < randomValue(); i++) {
              try {
                newTree.add(randomValue());
              } catch (e) {
                console.error(e)
              }
            }

            setTree(newTree);
          }}
        >
          Randomize!
        </button>
      </div>
      <hr />
      {tree !== null && (
        <TreeNode
          key={tree.value}
          node={JSON.parse(tree.toString())}
          onDelete={(node) => {
            try {
              tree.remove(node.value);
              setTree({ ...tree });
            } catch (err: any) {
              alert(err.message);
            }
          }}
        />
      )}
    </div>
  );
};
