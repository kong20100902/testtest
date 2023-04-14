const myFun = () => {
    return this;
};
// commet comment
console.log(myFun() === window)
