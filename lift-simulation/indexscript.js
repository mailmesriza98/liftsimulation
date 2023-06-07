function loadResult(event) {
    event.preventDefault(); // Prevent form submission
    
    //capture data
    var floorsInput = document.getElementById("floors");
    var liftsInput = document.getElementById("lifts");
  
    //feed data to variables for storage
    var floors = parseInt(floorsInput.value);
    var lifts = parseInt(liftsInput.value);
  
    
    var queryString = "?floors=" + floors + "&lifts=" + lifts;

    // Redirect to the new page with the captured data
    window.location.href = "lifts.html" + queryString;
  }
  