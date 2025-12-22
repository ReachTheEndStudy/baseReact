// allowUnreachableCode
export function fn(n: number) {
    if (n > 5) {
        return true;
    } else {
        return false;
    }
    //   return true;
}


//exactOptionalPropertyTypes
type User = {
    name?: string;
}

export const u: User = {
    //   name: undefined
};


//noFallthroughCasesInSwitch
export function fn1(x: number) {
    switch (x) {
        case 1:
            console.log("one");
            break
        case 2:
            console.log("two");
    }
}


// noImplicitAny
// export let a 


// noImplicitOverride
class Base {
    speak() { }
}
export class Child extends Base {
    override speak() { }
    //   speak() {}
}

// noImplicitReturns
export function getStatus(value: number) {
    if (value > 0) {
        return "positive";
    }
    return 12
    // console.log(3213)
}


// noUnusedLocals
export function calc(x: number) {
    //   const y = x * 2;
    return x + 1;
}


// noUnusedParameters
export function calc2(_x: number) {
    return 1;
}

