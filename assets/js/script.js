function drawSingleIssue(title, showStar) {
  return `
  <li class="issue-item">
    <p>${title}</p>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid"
    width="17" height="16" viewBox="0 0 17 16" class="star ${
      showStar ? " completed" : "uncompleted"
    }"
    onclick="toggleStar(evt)">
      <defs>
        <style>
          .cls-1 {
            fill: #fff;
            fill-rule: evenodd;
          }
        </style>
      </defs>
      <path d="M8.500,0.000 L11.301,5.028 L16.999,6.112 L13.033,10.302 L13.753,16.000 L8.500,13.561 L3.247,16.000 L3.967,10.302 L0.001,6.112 L5.699,5.028 L8.500,0.000 "
      class="cls-1" />
    </svg>
  </li>`;
}

function drawIssuesPerDay(dayIssues) {
  let days = "";
  dayIssues.forEach(issue => {
    days += `<ul>${drawSingleIssue(issue.title, issue.star)}</ul>`;
  });
  return days;
}

function drawIssues(displayedIssues) {
  $("#issues-list").empty();
  let issuesAsHtml = "";
  displayedIssues.forEach(dayIssues => {
    issuesAsHtml += `
    <li class="day-issues">
      ${dayIssues.day}
      ${drawIssuesPerDay(dayIssues.issues)}
    </li>`;
  });
  $(issuesAsHtml).appendTo("#issues-list");
}

function toggleStar(e) {
  e.currentTarget.classList.toggle("completed");
}

function removeIssues(classToRemove) {
  //remove issues
  drawIssues(issues);
  let issuesToRemove = $(classToRemove)
    .parent()
    .parent();
  issuesToRemove.remove();

  //remove dates if any are empty.
  let dates = $(".day-issues");
  dates.each(function(index, date) {
    if ($(date).children().length === 0) {
      $(date).remove();
    }
  });
}

function tabSelected(e, tab) {
  $(".sidebar-item").removeClass("active");
  e.currentTarget.classList.toggle("active");
  if (tab === "all") {
    drawIssues(issues);
  } else if (tab === "open") {
    removeIssues(".completed");
  } else {
    removeIssues(".uncompleted");
  }
}

function hideWindow() {
  $(".app-container").hide();
}

drawIssues(issues);
