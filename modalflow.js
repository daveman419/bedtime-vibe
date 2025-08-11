document.addEventListener('DOMContentLoaded', function() {
    // Select all the necessary elements
    const modal = document.getElementById('flowchart-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalClose = document.getElementById('modal-close');

    // You can have multiple nodes, so it's good practice to loop
    const nodes = document.querySelectorAll('.flowchart-node');

    nodes.forEach(node => {
        // Add a click event listener to each node
        node.addEventListener('click', () => {
            // Get the title and description from the clicked node
            modalTitle.textContent = node.querySelector('h3').textContent;
            modalDesc.textContent = node.dataset.desc;
            
            // Make the modal visible by adding the 'visible' class
            modal.classList.add('visible');
        });
    });

    // Add event listener to the close button
    modalClose.addEventListener('click', () => {
        modal.classList.remove('visible');
    });

    // Add event listener to close the modal by clicking the background
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('visible');
        }
    });
});