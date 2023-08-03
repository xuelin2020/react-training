function diff(prevTree, nextTree) {
    const patches = [];

    // 递归比较节点
    compareNodes(prevTree, nextTree, patches);

    return patches;
}

function compareNodes(prevNode, nextNode, patches) {
    if (prevNode.type !== nextNode.type) {
        // 节点类型不同，替换整个节点
        patches.push({ type: 'REPLACE', node: nextNode });
        console.log(`Replace node: ${prevNode.type} -> ${nextNode.type}`);
    } else if (prevNode.props && nextNode.props) {
        // 比较属性
        const propPatches = compareProps(prevNode.props, nextNode.props);
        if (propPatches.length > 0) {
            patches.push({ type: 'PROPS', patches: propPatches });
            console.log(`Update props for node: ${prevNode.type}`);
        }
    }

    // 比较子节点
    const prevChildren = prevNode.children || [];
    const nextChildren = nextNode.children || [];
    compareChildNodes(prevChildren, nextChildren, patches);
}

function compareProps(prevProps, nextProps) {
    const patches = [];

    // 检查旧属性是否存在于新属性中
    for (const prop in prevProps) {
        if (!(prop in nextProps)) {
            patches.push({ type: 'REMOVE_PROP', prop });
            console.log(`Remove prop: ${prop}`);
        }
    }

    // 检查新属性是否与旧属性值不同
    for (const prop in nextProps) {
        if (prevProps[prop] !== nextProps[prop]) {
            patches.push({ type: 'SET_PROP', prop, value: nextProps[prop] });
            console.log(`Set prop: ${prop} -> ${nextProps[prop]}`);
        }
    }

    return patches;
}

function compareChildNodes(prevChildren, nextChildren, patches) {
    const len = Math.max(prevChildren.length, nextChildren.length);

    for (let i = 0; i < len; i++) {
        const prevChild = prevChildren[i];
        const nextChild = nextChildren[i];

        if (!prevChild) {
            // 新增子节点
            patches.push({ type: 'ADD', node: nextChild });
            console.log(`Add new child node: ${nextChild.type}`);
        } else if (!nextChild) {
            // 删除子节点
            patches.push({ type: 'REMOVE', index: i });
            console.log(`Remove child node at index ${i}`);
        } else {
            // 比较子节点
            compareNodes(prevChild, nextChild, patches);
        }
    }
}

const prevTree = {
    type: 'div',
    props: { id: 'prevDiv', className: 'container' },
    children: [
        { type: 'h1', props: { className: 'title' }, children: ['Hello'] },
        { type: 'p', props: { className: 'content' }, children: ['This is the previous tree.'] }
    ]
};

const nextTree = {
    type: 'div',
    props: { id: 'nextDiv', className: 'container updated' },
    children: [
        { type: 'h1', props: { className: 'title updated' }, children: ['Hello, World!'] },
        { type: 'p', props: { className: 'content' }, children: ['This is the updated tree.'] },
        { type: 'button', props: { className: 'btn' }, children: ['Click me!'] }
    ]
};

const patches = diff(prevTree, nextTree);
console.log(patches);
