const cardContainer = document.getElementById('card-container');
const tabBtn = document.querySelectorAll('.tab-btn');
const searchBtn = document.getElementById('search');
const issueCount = document.querySelector('#issue-count h3');

const allIssueUrl = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
const singleIssueUrl = 'https://phi-lab-server.vercel.app/api/v1/lab/issue/';
const searchUrl = 'https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=';

searchBtn.addEventListener('input', async () => {
  const value = searchBtn.value;

  cardContainer.innerHTML = '';

  try {
    cardContainer.innerHTML = '';
    const searchResult = await getData(searchUrl + value);

    issueCounter(searchResult.length);

    searchResult?.forEach(item => {
      const card = document.createElement('div');

      card.innerHTML = `
      <div class="card p-4 bg-white border border-t-3 border-[#00A96E] rounded-md shadow-md md:min-h-[300px] lg:min-h-[350px]" onclick="openSingleIssue(${item.id})" >
            <!-- alert tag start -->
            <div class="flex justify-between mb-2">
              <div class="w-6 h-6 rounded-full bg-[#CBFADB]">
                <img class="" src="./assets/Open-Status.png" alt="" />
              </div>
              <div
                class="px-8 py-2 bg-[#FEECEC] rounded-2xl w-fit text-xs uppercase font-medium text-[#EF4444]"
              >
                ${item.priority}
              </div>
            </div>
            <!-- end alert tag  -->

            <!-- Issue Info -->
            <div>
              <h4 class="text-sm font-semibold text-[#1F2937] mb-2">
                ${item.title}
              </h4>

              <p class="text-xs text-[#E4E4E7] mb-2">
                ${item.description}
              </p>

              <!-- bug status -->
              <div class="flex gap-2 mb-4 flex-wrap">

              ${item?.labels
                ?.map(label => {
                  return `<div class="text-[#EF4444] uppercase flex items-center font-medium bg-[#FEECEC] gap-1 px-2 py-1 border border-[#FECACA] rounded-2xl w-fit">
                    <span>
                  <svg class="w-4 h-4" viewBox="0 0 8.625 10.5015" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  fill="none" customFrame="#000000">
	<path id="Vector" d="M7.56328 1.48363L8.08547 0.961913C8.13779 0.90959 8.1793 0.847473 8.20762 0.779109C8.23593 0.710745 8.25051 0.637472 8.25051 0.563476C8.25051 0.489479 8.23593 0.416207 8.20762 0.347843C8.1793 0.279479 8.13779 0.217362 8.08547 0.165038C8.03315 0.112715 7.97103 0.0712093 7.90267 0.042892C7.8343 0.0145747 7.76103 -9.54911e-10 7.68703 1.66533e-16C7.61304 9.54911e-10 7.53976 0.0145747 7.4714 0.042892C7.40304 0.0712093 7.34092 0.112715 7.2886 0.165038L6.71906 0.736913C6.00803 0.257538 5.17004 0.00143445 4.3125 0.00143445C3.45497 0.00143445 2.61697 0.257538 1.90594 0.736913L1.33547 0.165976C1.2298 0.0603035 1.08648 0.000937521 0.937033 0.000937521C0.78759 0.000937521 0.644268 0.0603035 0.538596 0.165976C0.432923 0.271648 0.373557 0.41497 0.373557 0.564413C0.373557 0.713856 0.432923 0.857178 0.538596 0.962851L1.06172 1.48363C0.37636 2.26714 -0.000957759 3.27298 1.8258e-06 4.31394L1.8258e-06 6.18894C1.8258e-06 7.33269 0.454353 8.42959 1.2631 9.23834C2.07185 10.0471 3.16876 10.5014 4.3125 10.5014C5.45625 10.5014 6.55315 10.0471 7.3619 9.23834C8.17065 8.42959 8.625 7.33269 8.625 6.18894L8.625 4.31394C8.62596 3.27298 8.24864 2.26714 7.56328 1.48363ZM7.5 4.31394L7.5 4.50144L1.125 4.50144L1.125 4.31394C1.125 3.46857 1.46083 2.65781 2.0586 2.06004C2.65637 1.46227 3.46712 1.12644 4.3125 1.12644C5.15788 1.12644 5.96863 1.46227 6.56641 2.06004C7.16418 2.65781 7.5 3.46857 7.5 4.31394ZM4.3125 9.37644C3.46739 9.37558 2.65714 9.03947 2.05956 8.44189C1.46197 7.8443 1.12587 7.03406 1.125 6.18894L1.125 5.62644L7.5 5.62644L7.5 6.18894C7.49913 7.03406 7.16303 7.8443 6.56545 8.44189C5.96786 9.03947 5.15761 9.37558 4.3125 9.37644ZM4.875 3.18894C4.875 3.04061 4.91899 2.8956 5.0014 2.77227C5.08381 2.64893 5.20094 2.5528 5.33799 2.49603C5.47503 2.43927 5.62583 2.42442 5.77132 2.45336C5.91681 2.48229 6.05044 2.55373 6.15533 2.65861C6.26022 2.7635 6.33165 2.89714 6.36059 3.04263C6.38953 3.18811 6.37468 3.33891 6.31791 3.47596C6.26115 3.613 6.16502 3.73014 6.04168 3.81255C5.91834 3.89496 5.77334 3.93894 5.625 3.93894C5.42609 3.93894 5.23532 3.85993 5.09467 3.71927C4.95402 3.57862 4.875 3.38786 4.875 3.18894ZM2.25 3.18894C2.25 3.04061 2.29399 2.8956 2.3764 2.77227C2.45881 2.64893 2.57594 2.5528 2.71299 2.49603C2.85003 2.43927 3.00083 2.42442 3.14632 2.45336C3.29181 2.48229 3.42544 2.55373 3.53033 2.65861C3.63522 2.7635 3.70665 2.89714 3.73559 3.04263C3.76453 3.18811 3.74968 3.33891 3.69291 3.47596C3.63615 3.613 3.54002 3.73014 3.41668 3.81255C3.29334 3.89496 3.14834 3.93894 3 3.93894C2.80109 3.93894 2.61032 3.85993 2.46967 3.71927C2.32902 3.57862 2.25 3.38786 2.25 3.18894Z" fill="rgb(239,68,68)" fill-rule="nonzero" />
</svg>
                    </span>
                    <p>${label}</p>
                  </div>`;
                })
                .join('')}

              </div>
              <!-- end bug status -->
            </div>
            <!-- End Issue Info -->

            <hr class="h-0.5 bg-[#E4E4E7] border-none" />

            <!-- author info -->
            <div class="flex flex-col gap-2 py-4 text-xs text-[#E4E4E7]">
              <p>#${item.id} by ${item.author}</p>
              <p>${item.createdAt}</p>
            </div>
            <!-- end author info -->
          </div>

`;
      cardContainer.appendChild(card);
    });
  } catch (error) {
    console.log(error);
  }
});

tabBtn.forEach(item => {
  item.addEventListener('click', () => {
    tabBtn.forEach(btn => btn.classList.remove('active'));
    item.classList.add('active');
    cardContainer.innerHTML = '';

    const type = item.dataset.type;
    if (type === 'all') {
      loadIssues();
    }
    if (type === 'open') {
      loadByStatus(type);
    }
    if (type === 'closed') {
      loadByStatus(type);
    }
  });
});

async function getData(url) {
  try {
    const allPosts = await fetch(url);
    const data = await allPosts.json();
    const result = data?.data;

    return result;
  } catch (error) {
    throw new Error(error);
  }
}

async function loadIssues() {
  try {
    cardContainer.innerHTML = '';
    const allIssues = await getData('https://phi-lab-server.vercel.app/api/v1/lab/issues');

    issueCounter(allIssues.length);

    allIssues?.forEach(item => {
      const card = document.createElement('div');

      card.innerHTML = `
      <div class="card p-4 bg-white border border-t-3 border-[#00A96E] rounded-md shadow-md md:min-h-[300px] lg:min-h-[350px]" onclick="openSingleIssue(${item.id})">
            <!-- alert tag start -->
            <div class="flex justify-between mb-2">
              <div class="w-6 h-6 rounded-full bg-[#CBFADB]">
                <img class="" src="./assets/Open-Status.png" alt="" />
              </div>
              <div
                class="px-8 py-2 bg-[#FEECEC] rounded-2xl w-fit text-xs uppercase font-medium text-[#EF4444]"
              >
                ${item.priority}
              </div>
            </div>
            <!-- end alert tag  -->

            <!-- Issue Info -->
            <div>
              <h4 class="text-sm font-semibold text-[#1F2937] mb-2">
                ${item.title}
              </h4>

              <p class="text-xs text-[#E4E4E7] mb-2">
                ${item.description}
              </p>

              <!-- bug status -->
              <div class="flex gap-2 mb-4 flex-wrap">

              ${item?.labels
                ?.map(label => {
                  return `<div class="text-[#EF4444] uppercase flex items-center font-medium bg-[#FEECEC] gap-1 px-2 py-1 border border-[#FECACA] rounded-2xl w-fit">
                    <span>
                  <svg class="w-4 h-4" viewBox="0 0 8.625 10.5015" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  fill="none" customFrame="#000000">
	<path id="Vector" d="M7.56328 1.48363L8.08547 0.961913C8.13779 0.90959 8.1793 0.847473 8.20762 0.779109C8.23593 0.710745 8.25051 0.637472 8.25051 0.563476C8.25051 0.489479 8.23593 0.416207 8.20762 0.347843C8.1793 0.279479 8.13779 0.217362 8.08547 0.165038C8.03315 0.112715 7.97103 0.0712093 7.90267 0.042892C7.8343 0.0145747 7.76103 -9.54911e-10 7.68703 1.66533e-16C7.61304 9.54911e-10 7.53976 0.0145747 7.4714 0.042892C7.40304 0.0712093 7.34092 0.112715 7.2886 0.165038L6.71906 0.736913C6.00803 0.257538 5.17004 0.00143445 4.3125 0.00143445C3.45497 0.00143445 2.61697 0.257538 1.90594 0.736913L1.33547 0.165976C1.2298 0.0603035 1.08648 0.000937521 0.937033 0.000937521C0.78759 0.000937521 0.644268 0.0603035 0.538596 0.165976C0.432923 0.271648 0.373557 0.41497 0.373557 0.564413C0.373557 0.713856 0.432923 0.857178 0.538596 0.962851L1.06172 1.48363C0.37636 2.26714 -0.000957759 3.27298 1.8258e-06 4.31394L1.8258e-06 6.18894C1.8258e-06 7.33269 0.454353 8.42959 1.2631 9.23834C2.07185 10.0471 3.16876 10.5014 4.3125 10.5014C5.45625 10.5014 6.55315 10.0471 7.3619 9.23834C8.17065 8.42959 8.625 7.33269 8.625 6.18894L8.625 4.31394C8.62596 3.27298 8.24864 2.26714 7.56328 1.48363ZM7.5 4.31394L7.5 4.50144L1.125 4.50144L1.125 4.31394C1.125 3.46857 1.46083 2.65781 2.0586 2.06004C2.65637 1.46227 3.46712 1.12644 4.3125 1.12644C5.15788 1.12644 5.96863 1.46227 6.56641 2.06004C7.16418 2.65781 7.5 3.46857 7.5 4.31394ZM4.3125 9.37644C3.46739 9.37558 2.65714 9.03947 2.05956 8.44189C1.46197 7.8443 1.12587 7.03406 1.125 6.18894L1.125 5.62644L7.5 5.62644L7.5 6.18894C7.49913 7.03406 7.16303 7.8443 6.56545 8.44189C5.96786 9.03947 5.15761 9.37558 4.3125 9.37644ZM4.875 3.18894C4.875 3.04061 4.91899 2.8956 5.0014 2.77227C5.08381 2.64893 5.20094 2.5528 5.33799 2.49603C5.47503 2.43927 5.62583 2.42442 5.77132 2.45336C5.91681 2.48229 6.05044 2.55373 6.15533 2.65861C6.26022 2.7635 6.33165 2.89714 6.36059 3.04263C6.38953 3.18811 6.37468 3.33891 6.31791 3.47596C6.26115 3.613 6.16502 3.73014 6.04168 3.81255C5.91834 3.89496 5.77334 3.93894 5.625 3.93894C5.42609 3.93894 5.23532 3.85993 5.09467 3.71927C4.95402 3.57862 4.875 3.38786 4.875 3.18894ZM2.25 3.18894C2.25 3.04061 2.29399 2.8956 2.3764 2.77227C2.45881 2.64893 2.57594 2.5528 2.71299 2.49603C2.85003 2.43927 3.00083 2.42442 3.14632 2.45336C3.29181 2.48229 3.42544 2.55373 3.53033 2.65861C3.63522 2.7635 3.70665 2.89714 3.73559 3.04263C3.76453 3.18811 3.74968 3.33891 3.69291 3.47596C3.63615 3.613 3.54002 3.73014 3.41668 3.81255C3.29334 3.89496 3.14834 3.93894 3 3.93894C2.80109 3.93894 2.61032 3.85993 2.46967 3.71927C2.32902 3.57862 2.25 3.38786 2.25 3.18894Z" fill="rgb(239,68,68)" fill-rule="nonzero" />
</svg>
                    </span>
                    <p>${label}</p>
                  </div>`;
                })
                .join('')}

              </div>
              <!-- end bug status -->
            </div>
            <!-- End Issue Info -->

            <hr class="h-0.5 bg-[#E4E4E7] border-none" />

            <!-- author info -->
            <div class="flex flex-col gap-2 py-4 text-xs text-[#E4E4E7]">
              <p>#${item.id} by ${item.author}</p>
              <p>${item.createdAt}</p>
            </div>
            <!-- end author info -->
          </div>

`;
      cardContainer.appendChild(card);
    });
  } catch (error) {
    console.log(error);
  }
}

async function loadByStatus(type) {
  try {
    cardContainer.innerHTML = '';
    const allIssues = await getData('https://phi-lab-server.vercel.app/api/v1/lab/issues');

    const posts = allIssues.filter(item => item.status === type);

    issueCounter(posts?.length);

    posts?.forEach(item => {
      const card = document.createElement('div');

      card.innerHTML = `
      <div class="card p-4 bg-white border border-t-3 border-[#00A96E] rounded-md shadow-md md:min-h-[300px] lg:min-h-[350px]" onclick="openSingleIssue(${item.id})" >
            <!-- alert tag start -->
            <div class="flex justify-between mb-2">
              <div class="w-6 h-6 rounded-full bg-[#CBFADB]">
                <img class="" src="./assets/Open-Status.png" alt="" />
              </div>
              <div
                class="px-8 py-2 bg-[#FEECEC] rounded-2xl w-fit text-xs uppercase font-medium text-[#EF4444]"
              >
                ${item.priority}
              </div>
            </div>
            <!-- end alert tag  -->

            <!-- Issue Info -->
            <div>
              <h4 class="text-sm font-semibold text-[#1F2937] mb-2">
                ${item.title}
              </h4>

              <p class="text-xs text-[#E4E4E7] mb-2">
                ${item.description}
              </p>

              <!-- bug status -->
              <div class="flex gap-2 mb-4 flex-wrap">

              ${item?.labels
                ?.map(label => {
                  return `<div class="text-[#EF4444] uppercase flex items-center font-medium bg-[#FEECEC] gap-1 px-2 py-1 border border-[#FECACA] rounded-2xl w-fit">
                    <span>
                  <svg class="w-4 h-4" viewBox="0 0 8.625 10.5015" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  fill="none" customFrame="#000000">
                        <path id="Vector" d="M7.56328 1.48363L8.08547 0.961913C8.13779 0.90959 8.1793 0.847473 8.20762 0.779109C8.23593 0.710745 8.25051 0.637472 8.25051 0.563476C8.25051 0.489479 8.23593 0.416207 8.20762 0.347843C8.1793 0.279479 8.13779 0.217362 8.08547 0.165038C8.03315 0.112715 7.97103 0.0712093 7.90267 0.042892C7.8343 0.0145747 7.76103 -9.54911e-10 7.68703 1.66533e-16C7.61304 9.54911e-10 7.53976 0.0145747 7.4714 0.042892C7.40304 0.0712093 7.34092 0.112715 7.2886 0.165038L6.71906 0.736913C6.00803 0.257538 5.17004 0.00143445 4.3125 0.00143445C3.45497 0.00143445 2.61697 0.257538 1.90594 0.736913L1.33547 0.165976C1.2298 0.0603035 1.08648 0.000937521 0.937033 0.000937521C0.78759 0.000937521 0.644268 0.0603035 0.538596 0.165976C0.432923 0.271648 0.373557 0.41497 0.373557 0.564413C0.373557 0.713856 0.432923 0.857178 0.538596 0.962851L1.06172 1.48363C0.37636 2.26714 -0.000957759 3.27298 1.8258e-06 4.31394L1.8258e-06 6.18894C1.8258e-06 7.33269 0.454353 8.42959 1.2631 9.23834C2.07185 10.0471 3.16876 10.5014 4.3125 10.5014C5.45625 10.5014 6.55315 10.0471 7.3619 9.23834C8.17065 8.42959 8.625 7.33269 8.625 6.18894L8.625 4.31394C8.62596 3.27298 8.24864 2.26714 7.56328 1.48363ZM7.5 4.31394L7.5 4.50144L1.125 4.50144L1.125 4.31394C1.125 3.46857 1.46083 2.65781 2.0586 2.06004C2.65637 1.46227 3.46712 1.12644 4.3125 1.12644C5.15788 1.12644 5.96863 1.46227 6.56641 2.06004C7.16418 2.65781 7.5 3.46857 7.5 4.31394ZM4.3125 9.37644C3.46739 9.37558 2.65714 9.03947 2.05956 8.44189C1.46197 7.8443 1.12587 7.03406 1.125 6.18894L1.125 5.62644L7.5 5.62644L7.5 6.18894C7.49913 7.03406 7.16303 7.8443 6.56545 8.44189C5.96786 9.03947 5.15761 9.37558 4.3125 9.37644ZM4.875 3.18894C4.875 3.04061 4.91899 2.8956 5.0014 2.77227C5.08381 2.64893 5.20094 2.5528 5.33799 2.49603C5.47503 2.43927 5.62583 2.42442 5.77132 2.45336C5.91681 2.48229 6.05044 2.55373 6.15533 2.65861C6.26022 2.7635 6.33165 2.89714 6.36059 3.04263C6.38953 3.18811 6.37468 3.33891 6.31791 3.47596C6.26115 3.613 6.16502 3.73014 6.04168 3.81255C5.91834 3.89496 5.77334 3.93894 5.625 3.93894C5.42609 3.93894 5.23532 3.85993 5.09467 3.71927C4.95402 3.57862 4.875 3.38786 4.875 3.18894ZM2.25 3.18894C2.25 3.04061 2.29399 2.8956 2.3764 2.77227C2.45881 2.64893 2.57594 2.5528 2.71299 2.49603C2.85003 2.43927 3.00083 2.42442 3.14632 2.45336C3.29181 2.48229 3.42544 2.55373 3.53033 2.65861C3.63522 2.7635 3.70665 2.89714 3.73559 3.04263C3.76453 3.18811 3.74968 3.33891 3.69291 3.47596C3.63615 3.613 3.54002 3.73014 3.41668 3.81255C3.29334 3.89496 3.14834 3.93894 3 3.93894C2.80109 3.93894 2.61032 3.85993 2.46967 3.71927C2.32902 3.57862 2.25 3.38786 2.25 3.18894Z" fill="rgb(239,68,68)" fill-rule="nonzero" />
</svg>
                    </span>
                    <p>${label}</p>
                  </div>`;
                })
                .join('')}

              </div>
              <!-- end bug status -->
            </div>
            <!-- End Issue Info -->

            <hr class="h-0.5 bg-[#E4E4E7] border-none" />

            <!-- author info -->
            <div class="flex flex-col gap-2 py-4 text-xs text-[#E4E4E7]">
              <p>#${item.id} by ${item.author}</p>
              <p>${item.createdAt}</p>
            </div>
            <!-- end author info -->
          </div>

`;
      cardContainer.appendChild(card);
    });
  } catch (error) {
    console.log(error);
  }
}

function issueCounter(num) {
  issueCount.innerHTML = num > 1 ? num + ' Issues' : num + ' Issue';
}

async function openSingleIssue(id) {
  const data = await getData(singleIssueUrl + id);

  displayModal(data);
}

function displayModal(data) {
  console.log(data);

  const singleModal = document.getElementById('my_modal_1');
  singleModal.innerHTML = '';

  const element = document.createElement('div');

  element.innerHTML = `    <div class="p-8 modal-box">
      <h1 class="text-6 font-bold mb-2">${data.title}</h1>
      <div class="flex gap-3 items-center text-[#64748B] text-sm mb-6">
        <span class="bg-green-500 text-white px-2 py-1 rounded-2xl">${data.status}</span>
        <span>${data.status}ed by ${data.assignee ? data.assignee : ''}</span>
        <span>${data.createdAt}</span>
      </div>

      <div class="mb-6">
          <span>bug</span>
        <span>help wanted</span>
      </div>

      <div class="text-normal text-[#64748B] mb-6">
        <p>
          ${data.description}
        </p>
      </div>

      <div class="flex gap-6 text-normal">
        <div class="flex-1 flex flex-col">
          <span class="text-[#64748B]">Assignee:</span>
          <span class="font-semibold">${data.assignee}</span>
        </div>

        <div class="flex-1 flex flex-col">
          <span class="text-[#64748B]">Priority:</span>
          <span class="font-semibold">${data.priority}</span>
        </div>
      </div>

              <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="bg-purple-700 text-white px-4 py-2 border-none outline-0 rounded-md hover:bg-purple-600 cursor-pointer">Close</button>
          </form>
        </div>
    </div>`;

  singleModal.appendChild(element);

  singleModal.showModal();
}

loadIssues();
