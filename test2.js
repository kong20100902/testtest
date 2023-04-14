const myFun = () => {
    return this;
};

console.log(myFun() === window)