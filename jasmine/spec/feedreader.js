/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This is the second test - it loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('URLs are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
         });


        /* This is the third test -it loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('names are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
         });
    });


    /* This is the second test suite named "The menu". This suite verifies 
     * that the menu is working as expected, when the application starts,
     * and when the users click the menu.
     */
    describe('The menu', function() {


        /* This is the fourth test - it ensures that the menu element is
         * hidden by default. When the menu is hidden there is a class
         * 'menu-hidden', and when the menu is showing this class does 
         * not exist.
         */

        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* This is the fifth test - it ensures the menu changes
          * visibility when the menu icon is clicked. I perform to 
          * clicks, after the first one the menu is showed and the 
          * class 'menu-hidden' does not exist, after the second one 
          * the menu is hidden and the class 'menu'hidden' appears.
          */

        it('changes visibility', function() {
 
            var menuIcon = $('.menu-icon-link'); 

            /* Simulate two menu clicks to test changes in visibility */         

            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).not.toBe(true);
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });

    /* This is the third test suite named "Initial Entries" - it ensures
     * that when the application starts there are initial entries
     */

    describe('Initial Entries', function() {


        /* This is the fifth test - it ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * LoadFeed() is asynchronous so this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        var entries, entriesLen;

        beforeEach (function(done) { /*The function done signals that the loadFeed function has completed */
            loadFeed(0,done);
        });

        /* Once the loadFeed function has completed, I can check if 'entriesLen' is greater then 0 */

        it ('at least one is loaded in the container', function(done) {
            entries = $('.entry');
            entriesLen = entries.length;
            expect(entriesLen).toBeGreaterThan(0);
            done();
        });

    });

    /* This is the fourth suite named "New Feed Selection", it ensures 
     * that the content changes when a new feed is loaded.
     */

    describe('New Feed Selection', function() { 

        /* This is the 6th test - it ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * LoadFeed is called twice using different parameters and 
         * the results are compared to be sure they are different.
         */

        var feed0, feed1;

        /* Call the loadFeed function with parameter 0 and saved the result in 'feed0' */
        beforeEach (function(done) {
            loadFeed(0, (function() {
                feed0 = $('.feed').html();
                done();
            }));
        });

        it ('has changed the content', function(done) {      

            /* Call the loadFeed function with parameter 1 and saved the result in 'feed1' */      
            loadFeed(1, (function() {
                feed1 = $('.feed').html();
                /* Verify if 'feed0' and 'feed1' have different content */
                expect(feed0).not.toEqual(feed1);
                done();
            }));
        });
    });
}());
