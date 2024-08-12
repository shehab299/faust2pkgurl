import { Command, Args, Flags, Errors } from "@oclif/core";
import transformCode from "./tranformCode.js";
import fs from 'node:fs';

class faust2pkgUrl extends Command {

  static description = "It converts a Faust program into using new pkgUrl format.";

  static examples = [
    `$ faust2pkgUrl main.dsp`,
    `$ faust2pkgUrl main.dsp -o main_pkg.dsp`,
    `$ faust2pkgUrl main.dsp -i`,
    `$ faust2pkgUrl main.dsp -l libraries.json`,
  ];
  

  static args = {
    
    file: Args.file({
      name: "dsp-file",
      description: "Faust file to convert",
      required: true,
    })
  }

  static flags = {

    inplace: Flags.boolean({
      char: "i",
      description: "Modify the file in place",
      default: false,
    }),

    out: Flags.string({
      char: "o",
      description: "Output file",
      required: false,   
    }),

    libraries: Flags.string({
      char: "l",
      description: "JSON file with library versions",
      required: false,
    })

  };

  saveFile(filePath, code) {
    try{
      fs.writeFileSync(filePath, code, 'utf8');
    }catch(e){
      throw new Errors.CLIError(`Error saving file: ${e.message}`);
    }
  }

  readLibraries(filePath) : object {
    try{
      let content = fs.readFileSync(filePath, 'utf8');
      let libraries = JSON.parse(content);
      return libraries;
    }catch(e){
      throw new Errors.CLIError(`Error reading libraries file: ${e.message}`);
    }
  };


  async run() : Promise<void> {

    const { args, flags } = await this.parse(faust2pkgUrl);

    const { file } = args;
    const { inplace, out, libraries } = flags;

    let faust_libraries = {};

    if(libraries)
        faust_libraries = this.readLibraries(libraries);

    let new_code = "";

    try{
      new_code = transformCode(file, faust_libraries);
    }catch(e){
      throw new Errors.CLIError(`Error transforming code: ${e.message}`);
    }

    if(inplace){
      this.saveFile(file, new_code);
    } else if(out){
      this.saveFile(out, new_code);
    } else {
      this.log(new_code);
    }

  }

}

export default faust2pkgUrl;