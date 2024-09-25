
const uriToByteArray = async (uri) => {
   try {
     // Fetch the image file from the URI
     const response = await fetch(uri);
 
     // Convert the response into an ArrayBuffer
     const arrayBuffer = await response.arrayBuffer();
 
     // Convert ArrayBuffer to byte array
     const byteArray = new Uint8Array(arrayBuffer);
 
     console.log('Byte array:', byteArray);
 
     return byteArray;
   } catch (error) {
     console.error('Error converting URI to byte array:', error);
   }
 };


      //   try {
      //    const response = await fetch(
      //       `http://192.168.100.100:9999/api/trans/image-upload/${code}`,
      //       {
      //          method: 'PATCH',
      //          headers: {
      //             Accept: "application/json",
      //             "Content-Type": "multipart/form-data",
      //           },
      //          body: formData,
      //        }
      //    );

      //    if (response.status != 200) {
      //       console.log("backend response : "+ response);
      //       throw new Error(`Error! status: ${response.status}`);
      //    }

      //    const json = await response.json();
      //    console.log(json)
      //    }catch (error) {
      //       console.error(error.type);
      //    }

      //   uriToByteArray(result.assets[0].uri)
