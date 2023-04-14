const myFun = () => {
    return this;
};
// commet
console.log(myFun() === window)
