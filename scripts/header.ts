/**
 * header.ts
 *
 * Author: Kritika Kapri, Amal Baradia
 * Student ID: 100938161, 100886422
 * Date: March 2025
 * 
 * This module loads the header component with navigation bar from an external HTML file
 */

import AuthenticationService from './authentication.js';

/**
 * Maintains compatibility with code that uses renderHeader
 * @returns HTML string for the header component
 */
export const renderHeader = (): string => {
    // Return empty string instead of placeholder to avoid showing "Loading..."
    return ``;
};

/**
 * Loads the header HTML from an external file and injects it into the DOM
 */
export async function LoadHeader(): Promise<void> {
    try {
        const response = await fetch("views/components/header.html");
        const html = await response.text();
        
        const headerElement = document.getElementById('mainHeader');
        if (headerElement) {
            headerElement.innerHTML = html;
            
            // Update UI based on authentication state
            updateHeaderAuthState();
            
            // Initialize header event listeners
            initHeader();
        } else {
            console.warn("[WARNING] No header element with ID 'mainHeader' found in DOM!");
        }
    } catch (error) {
        console.error(`[ERROR] Failed to load header: ${error}`);
    }
}

/**
 * Updates the header UI based on current authentication state
 */
function updateHeaderAuthState(): void {
    const isLoggedIn = AuthenticationService.isLoggedIn();
    const currentUser = AuthenticationService.getCurrentUser();
    
    if (isLoggedIn) {
        // Show user dropdown with user info
        const loginElement = document.querySelector('#login')?.closest('li');
        const userDropdownContainer = document.querySelector('#userDropdownContainer');
        
        if (loginElement) {
            loginElement.classList.add('d-none');
        }
        
        if (userDropdownContainer) {
            userDropdownContainer.classList.remove('d-none');
            
            const userDisplayName = document.querySelector('#userDisplayName');
            if (userDisplayName) {
                userDisplayName.textContent = `Welcome, ${currentUser?.displayName || 'User'}`;
            }
        }
    } else {
        // Show login link, hide user dropdown
        const loginElement = document.querySelector('#login')?.closest('li');
        const userDropdownContainer = document.querySelector('#userDropdownContainer');
        
        if (loginElement) {
            loginElement.classList.remove('d-none');
        }
        
        if (userDropdownContainer) {
            userDropdownContainer.classList.add('d-none');
        }
    }
}

/**
 * Initializes header functionality
 */
export const initHeader = (): void => {
    // Add event listener for logout link
    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            AuthenticationService.logout();
            
            // Update UI after logout
            updateHeaderAuthState();
        });
    }
    
    // Add event listener for search bar
    const searchBar = document.getElementById('searchBar');
    if (searchBar) {
        searchBar.addEventListener('keyup', (event) => {
            const target = event.target as HTMLInputElement;
            const searchQuery = target.value.toLowerCase();
            // Implement search functionality here
            // This will depend on your SPA structure
        });
    }
};

export default { renderHeader, initHeader, LoadHeader };