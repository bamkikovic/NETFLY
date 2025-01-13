/**
 * Handles file uploads and processing via Netlify Function.
 */
async function processFile() {
  const fileInput = document.getElementById('fileInput');
  const outputDiv = document.getElementById('output');

  // Clear previous output
  outputDiv.innerHTML = '';

  // Check if a file is uploaded
  if (!fileInput.files.length) {
    alert('Please upload a file!');
    return;
  }

  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append('file', file);

  try {
    // Call the Netlify Function
    const response = await fetch('/.netlify/functions/process-media', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (result.output) {
      // Show download link for the processed file
      outputDiv.innerHTML = `
        <p>Processing Complete! <a href="${result.output}" download>Download Enhanced File</a></p>
      `;
    } else {
      outputDiv.innerText = 'Processing failed. Please try again!';
    }
  } catch (error) {
    console.error('Error processing file:', error);
    outputDiv.innerText = 'Error processing file!';
  }
}
