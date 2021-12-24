var fs = require('fs');

function loadCategories(){
  var dirPath = 'blogs/';
  var result = []; //this is going to contain paths

  fs.readdir(__dirname + dirPath, function (err, filesPath) {
      if (err) throw err;
      result = filesPath.map(function (filePath) {
        console.log(dirPath + '/' + filePath)
          return dirPath + filePath;
      });
  });
}
function replaceAll(string, search, replace) {
  return string.split(search).join(replace);
}
function dirName(string){
  var sub1 = string.replace('-','/')
  return sub1.replace('-','')
} 
module.exports = function (plop) {
    const today = new Date(Date.now())
    const file_path = dirName(shortDate)
    plop.setHelper("file_path", () => file_path)
    plop.setPrompt('date', require('inquirer-date-prompt'))
    // optional welcome message

    plop.setWelcomeMessage(
      "Welcome to plop! What type of file would you like to generate?"
    ),
    plop.setGenerator("wiki topic",{
      description: "Generate a wiki topic",
      prompts: [
        {
          type: "input",
          name: "title",
          message: "Title of topic:"  
        }
      ],
      actions: [
        {
          type: "add",
          path: `{{dashCase title}}/README.md`,
          templateFile: "plop-templates/blog-post.hbs",
        },
      ]  
    }),
    plop.setGenerator("blog post", {
      description: "template for generating blog posts",
      prompts: [
        {
          type: "date",
          name: "datetime",
          message: "Publish date",
          format: { hour: undefined, minute: undefined }  
        },
        {
          type: "input",
          name: "title",
          message: "Title of post:",
        },
        {
          type: "input",
          name: "description",
          message: "Description of post:",
        },

        {
          type: "list",
          name: "category",
          message: "Category:",
          choices: ["3D Printing", "Programming", "Other"],
          filter: function(val) {
            return val.toLowerCase()
          },
        },
      ],
      actions: [
        {
          type: "add",
          path: `blogs/{{dashCase category}}/${file_pat}-{{dashCase title}}.md`,
          templateFile: "plop-templates/blog-post.hbs",
        },
      ],
    })
}