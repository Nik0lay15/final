import mri from "mri";

const {mode} = mri(process.argv.slice(2)); 

export default {
    port:process.env.PORT,
    mode:mode
};