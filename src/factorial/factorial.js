function factorial(num) {
    if(num == 1 && factorial.arguments.length == 1) {
        return 1;
    } else if(num > 1 && factorial.arguments.length == 1){
        return num * factorial(num -1);
    } else {
        return null;
    }
}