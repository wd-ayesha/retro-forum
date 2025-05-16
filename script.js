let readItems = JSON.parse(localStorage.getItem('readItems')) || [];

const updateSidebar = () => {
  const sidebar = document.getElementById('read-items-sidebar');
  const readCount = document.getElementById('read-count');

  sidebar.innerHTML = '';

  readItems.forEach(post => {
    const item = document.createElement("div");
    item.className = "bg-white rounded-lg p-3 flex justify-between items-center shadow-sm text-sm text-gray-700";
    item.innerHTML = `
      <span>${post.title}</span>
      <span class="text-gray-400"><i class="fa-solid fa-eye"></i> ${post.view_count || 0}</span>
    `;
    sidebar.appendChild(item);
  });

  readCount.innerHTML = `
    <i class="fa-solid fa-check text-green-500"></i> Mark as read (${readItems.length})
  `;
};

const handleMarkAsRead = (post) => {
  if (readItems.some(item => item.id === post.id)) return;

  readItems.push(post);
  localStorage.setItem('readItems', JSON.stringify(readItems));
  updateSidebar();
};

const clearAllReadItems = () => {
  readItems = [];
  localStorage.removeItem('readItems');
  updateSidebar();
};

const loadAllPosts = async () => {
  const url = 'https://openapi.programming-hero.com/api/retro-forum/posts';
  const response = await fetch(url);
  const result = await response.json();
  const data = result.posts || [];

  const postContainer = document.getElementById('discussion-card');
  postContainer.innerHTML = '';

  data.forEach((post) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="border border-indigo-200 rounded-xl p-4 bg-indigo-50 mb-4">
        <div class="flex items-start gap-4">
          <div class="avatar">
            <div class="w-10 rounded-xl bg-white"></div>
          </div>
          <div class="flex-1">
            <div class="text-xs flex items-center gap-2 mb-1">
              <span class="badge badge-xs ${post.isActive ? 'badge-success' : 'badge-error'}"></span>
              <span class="text-gray-500"># ${post.category || 'General'}</span>
              <span class="text-gray-400">Author : ${post.author.name || 'Anonymous'}</span>
            </div>
            <h3 class="font-semibold text-gray-800">${post.title}</h3>
            <p class="text-sm text-gray-500 mt-1">${post.description || 'No description available.'}</p>
            <div class="flex items-center gap-6 mt-4 text-gray-500 text-sm">
              <span class="flex items-center gap-1"><i class="fa-regular fa-comment"></i> ${post.comment_count || 0}</span>
              <span class="flex items-center gap-1"><i class="fa-solid fa-eye"></i> ${post.view_count || 0}</span>
              <span class="flex items-center gap-1"><i class="fa-regular fa-clock"></i> ${post.posted_time || 'N/A'}</span>
              <button class="ml-auto px-3 py-2 rounded-full bg-green-600" onclick='handleMarkAsRead(${JSON.stringify(post)})'>
               <i class="fa-solid fa-message text-white"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    postContainer.appendChild(div);
  });
};

updateSidebar();
loadAllPosts();
