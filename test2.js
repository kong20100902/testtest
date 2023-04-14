const myFun = () => {
    return this;
};

// commet comment comment2 comment3

console.log(myFun() === window)
