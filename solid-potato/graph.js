//numE < numV*(numV-1)
// function getGraph(numV) {
//   let numE = Math.floor(Math.random() * (numV - 1) * numV);

//   while(numE < (0.3*numV)){
//     numE = Math.floor(Math.random() * (numV - 1) * numV);
//   }
  
//   let adjList = new Array();

//   for (let index = 0; index < numV; index++) {
//     adjList[index] = new Array();
//   }

//   //   adjList.fill(new Array(), 0, numV);

//   for (let index = 0; index < numE; index++) {
//     let vert1 = Math.floor(Math.random() * numV);
//     let vert2 = Math.floor(Math.random() * numV);

//     if (vert1 !== vert2 && !adjList[vert1].includes(vert2)) {
//       // print(vert1 + ' , ' + vert2)
//       adjList[vert1].push(vert2);
//     } else if (vert1 === vert2 || adjList[vert1].includes(vert2)) {
//       index--;
//     }
//   }

//   return adjList;
// }

// let adjList = getGraph(numV);
