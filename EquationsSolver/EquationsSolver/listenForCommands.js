process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (text) {
    text = text.replace(/\r?\n|\r/g, "");
    if (text == 'quit') {
        console.log("Quitting");
        done();
    } else {
        console.log(eval(text));
    }
});

function done() {
  console.log('Now that process.stdin is paused, there is nothing more to do.');
  process.exit();
}