const AzureStorageBlob = require("@azure/storage-blob");

const connStr = "DefaultEndpointsProtocol=https;AccountName=teststorageaccount0619;AccountKey=MqnR4w5fMoCZ4PfXOcIWTl4yWi6/J70ezCnI29skvMpOGJWEoMblAza9VIngmySDMvp1wO0+0D4a0mcmZ4E3Zg==;EndpointSuffix=core.windows.net";

const blobServiceClient = AZS.BlobServiceClient.fromConnectionString(connStr);

async function listAllContainers() {
    let i = 1;
    let containers = blobServiceClient.listContainers();
    for await (const container of containers) {
      console.log(`Container ${i++}: ${container.name}`);
    }
}
  
listAllContainers();

async function listBlobsInContainer(containerName) {
  const containerClient = blobServiceClient.getContainerClient(containerName);

  let i = 1;
  let blobs = containerClient.listBlobsFlat();
  for await (const blob of blobs) {
    console.log(`Blob ${i++}: ${blob.name}`);
  }
}

listBlobsInContainer("report-templates");

async function downloadBlobToFolder(containerName, fileName) {
  const containerClient = blobServiceClient.getContainerClient(containerName);

}

// ---------------------------------------------------------------


const download = async (containerName, fileName) => {
  // Get a reference to a container
  const containerClient = await blobServiceClient.getContainerClient(containerName);
  // Get a block blob client
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);
  return blockBlobClient.download(0);

  

}

download("report-templates", "https://teststorageaccount0619.blob.core.windows.net/report-templates/ProjectRapport90c4137f-4a8f-4810-928d-6fe56b146174.xlsx");
