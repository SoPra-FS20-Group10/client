const maxNameLength = 15;

const NameLengthChecker = (name) => {
    if(String(name).length> maxNameLength){
        return String(name).slice(0, maxNameLength-3) + '...'
    }else{
        return name;
    }
};

export default NameLengthChecker
