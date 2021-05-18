let test = () => {
    let img1 = cv.imread('canv1');
    let img2 = cv.imread('canv2');

    let img1Gray = new cv.Mat();
    let img2Gray = new cv.Mat();
    cv.cvtColor(img1, img1Gray, cv.COLOR_BGRA2GRAY);
    cv.cvtColor(img2, img2Gray, cv.COLOR_BGRA2GRAY);
    let kp1 = new cv.KeyPointVector();
    let kp2 = new cv.KeyPointVector();
    let des1 = new cv.Mat();
    let des2 = new cv.Mat();

    var orb = new cv.AKAZE();

    orb.detectAndCompute(img1Gray, new cv.Mat(), kp1, des1);
    orb.detectAndCompute(img2Gray, new cv.Mat(), kp2, des2);
    let good_matches = new cv.DMatchVector();
    let bf = new cv.BFMatcher();
    let matches = new cv.DMatchVectorVector();

    bf.knnMatch(des1, des2, matches, 2);

    var counter = 0;
    for(let i = 0; i < matches.size(); ++i) {
        let match = matches.get(i);
        let dMatch1 = match.get(0);
        let dMatch2 = match.get(1);
        if (dMatch1.distance <= dMatch2.distance * parseFloat(0.9)) {
            good_matches.push_back(dMatch1);
            counter++;
        }
    }

    console.log(counter);
};

$("#imf1").change((e) => {
     var URL = window.webkitURL || window.URL;
     var url = URL.createObjectURL(e.target.files[0]);
     var img = new Image();
     img.src = url;

     img.onload = function() {
        img_width = img.width;
        img_height = img.height;
        console.log(img);

        document.getElementById("canv1").getContext('2d').drawImage(img, 0, 0, img_width, img_height);
     }
});
$("#imf2").change((e) => {
     var URL = window.webkitURL || window.URL;
     var url = URL.createObjectURL(e.target.files[0]);
     var img = new Image();
     img.src = url;

     img.onload = function() {
        img_width = img.width;
        img_height = img.height;
        console.log(img);

        document.getElementById("canv2").getContext('2d').drawImage(img, 0, 0, img_width, img_height);
     }
});