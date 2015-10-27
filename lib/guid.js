
export default function() {
  return Array.apply(null, Array(8)).map(guid).join('');
}

function guid(){
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
