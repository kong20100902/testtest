const myFun = () => {
    return this;
};
// commet comment comment2
console.log(myFun() === window)
