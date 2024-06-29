document.querySelectorAll(".delete-data").forEach((button) => {
  button.addEventListener("click", (event) => {
    const userId = event.target.getAttribute("data-id");
    const message = `Are you sure you want to delete?`;

    if (confirm(message)) {
      fetch(`/${userId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            window.location.href = window.location.href;
          } else {
            throw new Error("Failed to delete member");
          }
        })
        .catch((error) => alert(error.message));
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const BS = document.getElementById("BS");
  const MS = document.getElementById("MS");
  const BM = document.getElementById("BM");
  const AM = document.getElementById("AM");
  const BSection = document.getElementById("BSection");
  const MSection = document.getElementById("MSection");

  const sortBDate = document.getElementById("sortBDate");
  const sortMDate = document.getElementById("sortMDate");
  const Bascending = document.getElementById("Bascending");
  const Mascending = document.getElementById("Mascending");


  BS.addEventListener("change", () => {
    if (BS.checked) {
      BSection.classList.remove("hidden");
      MSection.classList.add("hidden");
      AM.disabled=true
      BM.disabled=false
    }
  });
  MS.addEventListener("change", () => {
    if (MS.checked) {
      MSection.classList.remove("hidden");
      BSection.classList.add("hidden");
      BM.disabled=true
      AM.disabled=false
    }
  });

  sortBDate.addEventListener("change",()=>{
    if(sortBDate.checked){
      Bascending.checked=true
    }
  })
  sortMDate.addEventListener("change",()=>{
    if(sortMDate.checked){
      Mascending.checked=true
    }
  })

  Bascending.addEventListener("change",()=>{
    if(Bascending.checked){
      sortBDate.checked=true
    }
  })
  Mascending.addEventListener("change",()=>{
    if(Mascending.checked){
      sortMDate.checked=true
    }
  })
});
