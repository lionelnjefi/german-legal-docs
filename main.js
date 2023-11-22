
const generatepdf = async () => {

    const firstName = document.querySelector("#fnameinput").value;
    const laststName = document.querySelector("#lnameinput").value;
    const fullName = firstName.concat(" ", laststName);
    console.log(fullName);

    /*
    //Alternative
    var doc = new jsPDF()
    doc.text('This is generated with the details below. \nFirst Name: {firstName} \nLast Name: {laststName}', 10, 10)
    doc.save('a4.pdf')
    */

    try {
        const apiUrl = 'https://api.docugenerate.com/v1/document'
        const dataObject = JSON.stringify([{
            'Name': [fullName]
        }])

        /* -H 'accept: application/json' \
         -H 'Authorization: 491c000c5fad32ed7787005b0723ad55' \
         -H 'Content-Type: multipart/form-data' \
         -F 'template_id=2U3i8x8vSsf7BZigyrun' \
         -F 'data=[{"Name":"Phip Crowch","Job Title":"Help Desk Operator","Company Name":"Ortiz Group","Street Address":"2971 Tomscot Avenue","City":"Annapolis","State":"Maryland","Zip Code":"21405","Email":"pcrowch0@disqus.com","Phone":"(443) 3819199"}]' \
         -F 'file=' \
         -F 'sheet=' \
         -F 'name=' \
         -F 'output_name=' \
         -F 'output_format=.pdf' \
         -F 'single_file=true' \
         -F 'page_break=false'
         */

        const formData = new FormData();
        formData.append('template_id', 'MheRGiibZEejptVxTkRp');
        formData.append('data', dataObject);
        formData.append('output_name', 'test');
        formData.append('output_quality', '100');
        formData.append('output_format', '.pdf');
        formData.append('single_file', 'true');
        formData.append('page_break', 'true');

        const generated = await fetch("https://api.docugenerate.com/v1/document", {
            method: "POST",
            headers: {
                "authorization" : "f3c9d7acdc458463164d2611d5b87e87"
            },
            body: formData
        })
        const response = await generated.json(); 
        fileUrl = response.document_uri;
        console.log(fileUrl);
        window.open(fileUrl, '_blank').focus();
    } catch (err) {
        console.log(err.message);
    }

    

}