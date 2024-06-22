<% "---" %>
<%* let newEntry = await tp.user.createJournalEntry(tp) %><%* if (newEntry) { %><%* await tp.file.rename(newEntry.datestring) %>
<% newEntry.frontmatter %>
<% "---" %>
# Journal Entry - <% newEntry.datestring %>

<%* } %>