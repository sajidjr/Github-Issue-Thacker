// Tab & Load Issues........
console.log('js connected');

let currentTab = "all";

const tabActive = ["bg-blue-500","text-white","border-blue-500"];
const tabInactive = ["bg-transparent","text-slate-700","border-slate-300"];

function loadIssues(tab = "all") {
  currentTab = tab;

  // TAB ACTIVE
  const tabs = ["all","open","closed"];
  tabs.forEach(t=>{
    const button = document.getElementById(`tab-${t}`);

    if(t===tab){
      button.classList.remove(...tabInactive);
      button.classList.add(...tabActive);
    } else {
      button.classList.remove(...tabActive);
      button.classList.add(...tabInactive);
    }
  });

  // loading issues from server..
  

  const spinner = document.getElementById("loading-spinner");
  spinner.classList.remove("hidden"); // show spinner


  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
  .then(res=>res.json())
  .then(data=>{

    let issues = data.data;

    if(tab==="open"){
      issues = issues.filter(i=>i.status==="open");
    }

    if(tab==="closed"){
      issues = issues.filter(i=>i.status==="closed");
    }

    const countEl = document.getElementById("issue-count");
    countEl.textContent = `${issues.length} Issues`;

    displayIssues(issues);
    spinner.classList.add("hidden"); // hide spinner

  });
}
// Modal for Issue Details............
const loadIssueDetails = async (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const details = await res.json();

  displayIssueDetails(details.data);
}
const displayIssueDetails = (issue) => {
    console.log(issue);

    const modal = document.getElementById("issue-container");
    modal.innerHTML = `
            <div>
          <h2 class="text-3xl font-bold mb-3">
           ${issue.title}
          </h2>
        </div>
        <div class="flex items-center gap-3 text-sm text-gray-500 mb-4">

          <span class="bg-[#00A96E] text-green-700 px-3 py-1 rounded-full font-medium">
             ${issue.status}
          </span>

          <span>• Opened by <b>${issue.author}</b></span>

          <span>• ${new Date(issue.createdAt).toLocaleDateString()}</span>

        </div>

        <div class="flex gap-4 mb-5">

          ${
            issue.labels
              .map(
                (label) =>
                  `<span class="flex items-center gap-1 text-orange-500 text-sm font-semibold">
                    ${label.toUpperCase()}
                  </span>`
              )
              .join("")
          }
        </div>
        <p class="text-gray-600 mb-10 leading-relaxed">
           ${issue.description}
        </p>
        <div class="flex justify-between items-center mb-8">

          <!-- Assignee -->
          <div>
            <p class="text-gray-400 text-sm">Assignee:</p>
            <p class="font-semibold text-lg"> ${issue.assignee || "Not Assigned"}</p>
          </div>

          <!-- Priority -->
          <div class="text-center space-y-1">
            <p class="text-gray-400 text-sm">Priority:</p>

            <span class="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
              ${issue.priority.toUpperCase()}
            </span>
          </div>

        </div>

     
    `;

    document.getElementById("my_modal").showModal();
}

// Display Issues Function........
function displayIssues(issues){

  const container = document.getElementById("issues-container");
  container.innerHTML="";

  issues.forEach(issue=>{

    const div=document.createElement("div");

    const borderColor = issue.status === "open" ? "#64748B" : "#A855F7";

    div.style.borderTop=`4px solid ${borderColor}`;
    div.style.borderBottom=`4px solid ${borderColor}`;

    div.className="p-4 rounded-xl shadow mb-6";

    div.innerHTML=`
      <div onclick="loadIssueDetails(${issue.id})" class="cursor-pointer">
         <div class="flex justify-between items-center mb-3">
        <div class="w-3 h-3 rounded-full animate-spin" style="border:2px solid  ${borderColor}"></div>
        <p class="bg-red-500 rounded-full p-1 font-semibold uppercase text-sm">${issue.priority}</p>
      </div>

      <h2 class="text-xl font-bold mb-2">${issue.title}</h2>

      <p class="text-gray-500 text-sm mb-4">${issue.description}</p>

      <div class="flex flex-wrap gap-2 mb-4">
        
         ${issue.labels.map(label => `
          <span class="px-3 py-1 bg-pink-400 rounded-full text-xs md:text-sm"
            style="border:1px solid ${label === 'BUG' ? '#dc2626' : label === 'HELP WANTED' ? '#facc15' : '#94a3b8'};
                   color:${label === 'BUG' ? '#dc2626' : label === 'HELP WANTED' ? '#facc15' : '#64748b'}">
            ${label}
          </span>
        `).join('')}

      </div>

      <div class="text-gray-400 text-xs">
        <p>#${issue.id} by ${issue.author}</p>
        <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
      </div>
      </div>
    `;

    container.appendChild(div);

  });

}

// Search Functionality........
document.getElementById("search-input").addEventListener("input", async (e) => {
  const text = e.target.value;

  if(text === ""){
    loadIssues(currentTab);
    return;
  }

  const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`);
  const data = await res.json();
  let issues = data.data;

  // Tab filter maintain
  if(currentTab === "open") issues = issues.filter(i=>i.status==="open");
  if(currentTab === "closed") issues = issues.filter(i=>i.status==="closed");

  // Update issue count
  document.getElementById("issue-count").textContent = `${issues.length} Issues`;

  displayIssues(issues);
});

window.onload=()=>loadIssues("all");
