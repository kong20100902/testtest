const myFun = () => {
    return this;
};
// commet comment
// something
console.log(myFun() === window)
