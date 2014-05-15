window.code_templates = {"factorial_clojure":{"files":[{"value":";[tag:note:gem] I'm positive that this test could be better using some kind of\n;sequence comparison.  Please improve, and also make the code idiomatic as\n;well.\n\n(ns this.test.namespace\n   (:use clojure.test))\n\n(load-file \"./code.clj\")\n\n(deftest test-adder\n  (is (= 1  (fact 1)))\n  (is (= 2  (fact 2)))\n  (is (= 6  (fact 3)))\n)\n\n(run-tests 'this.test.namespace)\n\n;cffileid:25\n","name":"unittests.clj"},{"value":"clojure_1_6_0\n","name":"Runner"},{"value":"(defn fact [x]\n    (loop [n x f 1]\n        (if (= n 1)\n            f\n            (recur (dec n) (* f n)))))\n\n;cffileid:24\n","name":"code.clj"}]},"factorial_in_haskell":{"files":[{"value":"import Code\n\nimport Test.HUnit\n\ntest0 = TestCase (assertEqual \"factorial for 0\" (1) (fac 0))\ntest1 = TestCase (assertEqual \"factorial for 1\" (1) (fac 1))\ntest2 = TestCase (assertEqual \"factorial for 2\" (2) (fac 2))\ntest3 = TestCase (assertEqual \"factorial for 3\" (6) (fac 3))\ntest4 = TestCase (assertEqual \"factorial for 4\" (24) (fac 4))\ntest5 = TestCase (assertEqual \"factorial for 5\" (120) (fac 5))\n\nmain = runTestTT $ TestList [test0, test1, test2, test3, test4, test5]\n--cffileid:2\n","name":"unittests.hs"},{"value":"haskell_6\n","name":"Runner"},{"value":"module Code ( fac ) where\n\nfac n = if n == 0 then 1 else n * fac (n-1)\n\n--cffileid:1\n","name":"Code.hs"}]},"kmp_python":{"files":[{"value":"from code import *\n\nimport unittest\n\nclass TestKMPFunctions(unittest.TestCase):\n\n    def test_fail_table_with_no_repeated_characters(self):\n        self.assertEqual(failTable(\"ababcac\"), [None, 0, 0, 1, 2, 0, 1, 0])\n\n    def test_fail_table_with_en_present_three_times(self):\n        self.assertEqual(failTable(\"enlightenment\"), [None, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 1, 2, 0])\n\n    def test_fail_table_with_in_present_three_times(self):\n        self.assertEqual(failTable(\"pinpointing\"), [None, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0])\n\n    def test_word_doubled(self):\n        self.assertEqual(failTable(\"hotshots\"), [None, 0, 0, 0, 0, 1, 2, 3, 4])\n\n    def test_fail_table_unde_repeated_but_not_anchored_at_end_of_string(self):\n        self.assertEqual(failTable(\"underfunded\"), [None, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 0])\n\n    def test_fail_table_with_some_repeated_characters(self):\n        self.assertEqual(failTable(\"george\"), [None, 0, 0, 0, 0, 1, 2])\n\n    def test_match_at_beginning_of_string(self):\n        self.assertEqual(kmpMatch(\"george\", \"george likes geocaching\"), 0)\n\n        #cfinstrument_start\n        matchlist = [[0,0], [0,1], [0,2], [0,3], [0,4], [0,5]]\n        self.assertEqual(match_index_instrument, matchlist) #cfinstrument\n        #cfinstrument_end\n\n    def test_match_with_failures(self):\n\n        #                         14       23   28       37\n        #                         |__      |    |____    |_____\n        haystack = \"she mentioned geocaching to georgian george\"\n        #                                           |\n        #                                           32, but implicitly matched\n        #                                               by failTable so not in\n        #                                               match list\n\n        self.assertEqual(kmpMatch(\"george\", haystack), 37)\n\n        #cfinstrument_start\n        matchlist = [\n            [14,0], [14,1], [14,2],\n            [23,0],\n            [28,0], [28,1], [28,2], [28,3], [28,4],\n            [37,0], [37,1], [37,2], [37,3], [37,4], [37,5]\n        ]\n        self.assertEqual(match_index_instrument, matchlist)\n\n        faillist = [\n            [14, 3], [17, 0],\n            [23, 1], [24, 0],\n            [28, 5], [32, 1],\n            [32, 1], [33, 0]\n        ]\n        self.assertEqual(fail_instrument, faillist)\n        #cfinstrument_end\n\nif __name__ == '__main__':\n    unittest.main()\n\n#cffileid:36\n","name":"unittests.py"},{"value":"python_2_7_3\n","name":"Runner"},{"value":"# File: code.py\n# Author: Keith Schwarz (htiek@cs.stanford.edu)\n#\n# An implementation of the Knuth-Morris-Pratt (KMP) string-matching algorithm.\n# This algorithm takes as input a pattern string P and target string T, then\n# finds the first occurrence of the string T in the pattern P, doing so in time\n# O(|P| + |T|).  The logic behind the algorithm is not particularly complex,\n# though getting it to run in linear time requires a few non-obvious tricks.\n#\n# To motivate KMP, consider the naive algorithm for trying to match a pattern\n# string P against a target T.  This would work by considering all possible\n# start positions for the pattern P in the target T, then checking whether a\n# match exists at each of those positions.  For example, to match the string\n# ABC against the target string ABABABACCABC, we'd get\n#\n#     ABABABACCABC\n#     ABX               (first two characters match, last does not)\n#      X                (first character doesn't match)\n#       ABX             (first two characters match, last does not)\n#        X              (first character doesn't match)\n#         ABX           (first two characters match, last does not)\n#          X            (first character doesn't match)\n#           AX          (first character matches, second doesn't)\n#            X          (first character doesn't match)\n#             X         (first character doesn't match)\n#              ABC      (match found)\n#\n# This algorithm runs in O(mn) in the worst case, where m = |T| and n = |P|,\n# because it has to do O(n) work to check whether the string matches O(m) times\n# for each spot in the string.\n#\n# However, a lot of this is wasted work.  For example, in the above example,\n# consider what happens when we know that the string ABC does not match the\n# first part of the string, ABA.  At this point, it would be silly to actually\n# try to match the string at the string starting with the B, since there's no\n# possible way that the string could match there.  Instead, it would make more\n# sense to instead start over and try matching ABC at the next A.  In fact,\n# more generally, if we can use the information we have about what characters\n# we already matched to determine where we should try to resume the search in\n# the string, we can avoid revisiting characters multiple times when there's no\n# hope that they could ever match.\n#\n# The idea we'll use is to look for \"borders\" of a string, which are substrings\n# that are both a prefix and suffix of the string.  For example, the string\n# \"aabcaa\" has \"aa\" as a border, while the string \"abc\" just has the empty\n# string as a border.  Borders are useful in KMP because they encode\n# information about where we might need to pick up the search when a particular\n# match attempt fails.  For example, suppose that we want to match ABABC\n# against the string ABABABC.  If we start off by trying to match the string,\n# we'll find that they overlap like this:\n#\n#    ABABABC\n#    ABABx\n#\n# That is, the first four characters match, but the fifth does not.  At this\n# point, rather than naively restarting the search at the second character (B),\n# or even restarting it at the third position (A), we can instead note that we\n# can treat the last two characters of the string we matched (AB) as the first\n# two characters of the pattern string ABABC if we just treated it instead as\n# though we had\n#\n#    ABABABC\n#    ABABx\n#      ABABC\n#\n# If we can somehow remember the fact that we already matched the AB at the\n# start of this string, we could just confirm that the three characters after\n# it are ABC and be done.  There's no need to confirm that the characters at\n# the front match.\n#\n# In order to make this possible, we'll construct a special data structure\n# called the \"fail table.\"  This table stores, for each possible prefix of the\n# string to match, the length of the longest border of that prefix.  That way,\n# when we find a mismatch, we know where the next possible start location could\n# be found.  In particular, once we have a mismatch, if there's any border of\n# the prefix of the pattern that we matched so far, then we can treat the end\n# of that matching prefix as the start of a prefix of the word that occurs\n# later in the target.\n#\n# The basic idea behind KMP is, given this table, to execute the following:\n#\n#  - Guess that the string starts at the beginning of the target.\n#  - Match as much of the string as possible.\n#  - If the whole string matched, we're done.\n#  - Otherwise, a mismatch was found.  Look up the largest border of the\n#    string that was matched so far in the failure table.  Suppose it has\n#    length k.\n#  - Update our guess of the start position to be where that border occurs\n#    in the portion matched so far, then repeat this process.\n#\n# Notice that once we've matched a character against part of the pattern (or\n# found that it can't possibly match), we never visit that character again.\n# This is responsible for the fast runtime of the algorithm (though I'll give a\n# more formal description later on).\n\n# Function: failTable(pattern)\n# Usage: failTable(\"This is a string!\")\n# -----------------------------------------------------------------------------\n# Given a string, constructs the KMP failure table for that string.  The values\n# in the table are defined as\n#\n#    table[i] = |LongestProperBoundary(pattern[0:i)])|\n#\n# Where the longest proper boundary of a string is the longest proper substring\n# of that string that is both a prefix and a suffix.  For example, given the\n# string \"abcabc,\" the longest proper boundary is abc.  Similarly, given the\n# string \"apple,\" the longest proper boundary is the empty string.\n#\n# As a sample output of this function, given the string \"ababcac\", the table\n# would be\n#\n#     a b a b c a c\n#    * 0 0 1 2 0 1 0\n#\n# This means, for example, that the longest proper boundary of the prefix \"aba\"\n# has length 1, while the longest proper boundary of the string as a whole is\n# the empty string.  Notice that the first entry is *, which we have chosen\n# because there is no mathematically well-defined proper substring of the empty\n# string.  We can put anything we want there, and we'll go with None.\n#\n# To compute the values of this table, we use a dynamic programming algorithm\n# to compute a slightly stronger version of the function.  We define the\n# function \"Extended Longest Proper Boundary\" (xLPB) as follows:\n#\n#    xLPB(string, n, char) = The longest proper boundary of string[0:n] + char\n#\n# The idea behind this function is that we want to be able to recycle the\n# values of the longest proper boundary function for smaller prefixes of the\n# string in order to compute the longest proper boundary for longer prefixes.\n# To make this easier, the xLPB function allows us to talk about what would\n# happen if we extended the longest proper boundary of some prefix of the\n# string by a single character.  Notice that for any nonzero n, we have that\n#\n#   LongestProperBoundary(string[0:n]) = xLPB(string, n - 1, string[n])\n#\n# That is, we simply tear off the last character and use it as the final\n# argument to xLPB.  Given this xLPB function, we can compute its values\n# recursively using the following logic.  As a base case, xLPB(string, 0, char)\n# is the longest proper boundary of string[0:0] + char = char.  But this has\n# only one proper boundary, the empty string, and so its value must be zero.\n#\n# Now suppose that for all n' < n we have the value of xLPB(string, n', char)\n# for any character char.  Suppose we want to go and compute\n# xLPB(string, n, char).  Let's think about what this would mean.  Given that\n# n is not zero, we can think of this problem as trying to find the longest\n# proper boundary of this string:\n#\n#     +------------+---+------------+------------+---+\n#     |     LPB    | ? |    ...     |     LPB    | c |\n#     +------------+---+------------+------------+---+\n#\n#     ^                                          ^ ^\n#     +----------------------+-------------------+ |\n#                            |                     |\n#                   String of length n      New character\n#\n# The idea is that we have the original string of length n, followed by our new\n# character char (which we'll abbreviate c).  In this diagram, I've marked the\n# LPB of the string of length n.  Notice that right after the LPB at the prefix\n# of the string, we have some character whose value is unknown (since n != 0\n# and the LPB can't be the whole string).  If this value is equal to c, then\n# the LPB of the whole string can be formed by simply extending the LPB of the\n# first n characters.  There can't be a longer proper boundary, since otherwise\n# we could show that by taking that longer boundary and dropping off the\n# character c, we'd end up with a longer proper boundary for the first n\n# characters of the string, contradicting that we chose the longest proper\n# boundary.\n#\n# By our above argument, remember that the length of the longest proper\n# boundary of the first n characters of the string is given by\n#\n#    xLPB(string, n - 1, string[n - 1])\n#\n# Thus we have the first part of our recurrence, which is defined as\n#\n#    xLPB(string, n, char) =\n#        if n = 0, then 0.\n#        let k = xLPB(string, n - 1, string[n - 1])\n#        if string[k] == char, return k + 1\n#        else, ???\n#\n# Now, suppose that we find that the character after the LPB does not match.\n# If this happens, we can then make the following observation.  Below I've\n# reprinted the above diagram:\n#\n#     +------------+---+------------+------------+---+\n#     |     LPB    | ? |    ...     |     LPB    | c |\n#     +------------+---+------------+------------+---+\n#\n#     ^                                          ^ ^\n#     +----------------------+-------------------+ |\n#                            |                     |\n#                   String of length n      New character\n#\n# Notice that any LPB of this new string must be a prefix of the LPB of the\n# first n characters and a suffix of the LPB followed by the character c.\n# Since by definition the LPB of the first n characters must be a prefix of\n# those n characters, we have the following elegant conclusion to our\n# recurrence:\n#\n#    xLPB(string, n, char) =\n#        if n = 0, then 0.\n#        let k = xLPB(string, n - 1, string[n - 1])\n#        if string[k] == char, return k + 1\n#        else, xLPB(string, k, char)\n#\n# The reason for this is that xLPB(string, k, char) asks for the longest\n# proper boundary of the LPB of the string formed from the first n characters\n# of the string followed by the character c, which is exactly what we described\n# above.\n#\n# As written, filling in the table of LPB values would take O(n^2) time, where\n# n is the length of the string.  However, using dynamic programming and an\n# amortized analysis, we can show that this function can be made to run in\n# O(n) time.  In particular, suppose that for all n' < n, we know the value of\n# LPB(string[0:n]).  Then in the above formulation of xLPB, the first\n# recursive call is known, and the only recursive call we may actually need to\n# make is the second.\n#\n# However, this doesn't seem to say anything about the runtime of the second\n# recursive call, which seems as though it might cause the evaluation of this\n# function to run in time O(n).  This is correct, but in an *amortized* sense\n# the whole table can still be computed in O(n) time overall.  To see this,\n# let's define a potential function Phi(k) that associates a potential at each\n# point of the computation of the table.  In particular, define Phi(k) as\n#\n#   Phi(0)     = 0\n#   Phi(k + 1) = result[k - 1]\n#\n# Here, result is the resulting table of LPB values.  Because of this, we can\n# remark that result[k] < k, since the longest proper border of a string can't\n# be any longer than that string.\n#\n# Let's now show that this potential function gives an amortized O(1) cost for\n# each table entry computation, and thus an O(n) overall runtime for the table-\n# building algorithm.  To see this, consider what happens when the logic to\n# compute the next value runs.  The runtime for this step is bounded by the\n# number of recursive calls made to a subproblem.  However, each subproblem is\n# then of size given by the LPB of a slightly smaller problem.  This subproblem\n# must then have size at most the size of that smaller subproblem.  In other\n# words, we can say that each recursive call drops the maximum possible value\n# of the LPB for the current prefix by at least one.  Consequently, if k\n# recursive calls are made, the LPB of the current prefix is at least k smaller\n# than the LPB of the previous prefix, and so\n#\n#   D Phi = -k\n#\n# And so the amortized cost of computing the next term is 1 + k - k = O(1).\n\nmatch_index_instrument = [] #cfinstrument\nfail_instrument = [] #cfinstrument\n\ndef failTable(pattern):\n    # Create the resulting table, which for length zero is None.\n    result = [None]\n\n    # Iterate across the rest of the characters, filling in the values for the\n    # rest of the table.\n    for i in range(0, len(pattern)):\n        # Keep track of the size of the subproblem we're dealing with, which\n        # starts off using the first i characters of the string.\n        j = i\n\n        while True:\n            # If j hits zero, the recursion says that the resulting value is\n            # zero since we're looking for the LPB of a single-character\n            # string.\n            if j == 0:\n                result.append(0)\n                break\n\n            # Otherwise, if the character one step after the LPB matches the\n            # next character in the sequence, then we can extend the LPB by one\n            # character to get an LPB for the whole sequence.\n            if pattern[result[j]] == pattern[i]:\n                result.append(result[j] + 1)\n                break\n\n            # Finally, if neither of these hold, then we need to reduce the\n            # subproblem to the LPB of the LPB.\n            j = result[j]\n    \n    return result\n\n# Function: kmpMatch(needle, haystack)\n# Usage: print kmpMatch(\"0101\", \"0011001011\") # Prints 5\n# -----------------------------------------------------------------------------\n# Uses the KMP algorithm to find an occurrence of the specified needle string\n# in the haystack string.  To do this, we compute the failure table, which\n# is done above.  Next, we iterate across the string, keeping track of a\n# candidate start point and length matched so far.  Whenever a match occurs, we\n# update the length of the match we've made.  On a failure, we update these\n# values by trying to preserve the maximum proper border of the string we were\n# able to manage by that point.\ndef kmpMatch(needle, haystack):\n    del match_index_instrument[ 0:len(match_index_instrument) ] #cfinstrument\n    del fail_instrument[ 0:len(fail_instrument) ]               #cfinstrument\n\n    # Compute the failure table for the needle we're looking up.\n    fail = failTable(needle)\n\n    # Keep track of the start index and next match position, both of which\n    # start at zero since our candidate match is at the beginning and is trying\n    # to match the first character.\n    index = 0\n    match = 0\n\n    # Loop until we fall off the string or match.\n    while index + match < len(haystack):\n\n        # If the current character matches the expected character, then bump up\n        # the match index.\n        if haystack[index + match] == needle[match]:\n            match_index_instrument.append([index, match]) #cfinstrument\n            match = match + 1\n\n            # If we completely matched everything, we're done.\n            if match == len(needle):\n                return index\n\n        # Otherwise, we need to look at the fail table to determine what to do\n        # next.\n        else:\n            # If we couldn't match the first character, then just advance the\n            # start index.  We need to try again.\n            if match == 0:\n                index = index + 1\n\n            # Otherwise, see how much we need to skip forward before we have\n            # another feasible match.\n            else:\n                fail_instrument.append([index, match]) #cfinstrument\n                index = index + match - fail[match]\n                match = fail[match]\n                fail_instrument.append([index, match]) #cfinstrument\n\n    # If we made it here, then no match was found.\n    return None\n\n#cffileid:37\n","name":"code.py"}]},"stack_in_c":{"files":[{"value":"#include \"code.h\"\n#include \"/check-framework/src/check.h\"\n#include <stdio.h>\n\nSTART_TEST (test_create_push_pop_delete)\n{\n  // Create\n  Node **stack;\n  fail_unless(create_stack(stack) == true, \"the stack was successfully created\");\n\n  // Push\n  fail_unless( push(stack, 6) == true, \"6 was successfully pushed onto the stack\");\n  fail_unless( (*stack)->value == 6, \"the internals are correct\");\n  fail_unless( push(stack, 10) == true, \"10 was successfully pushed onto the stack\");\n  fail_unless( (*stack)->value == 10, \"the internals are correct\");\n\n  // Pop\n  int popped_value = 0;\n  fail_unless(pop(stack, &popped_value) == true, \"The first pop succeeded\");\n  fail_unless(popped_value == 10, \"The most recent value\");\n\n  fail_unless(pop(stack, &popped_value) == true, \"The second pop succeeded\");\n  fail_unless(popped_value == 6, \"The initial value\");\n  \n  fail_unless(pop(stack, &popped_value) == false, \"The pop failed because the stack is empty\");\n  fail_unless(popped_value == 0, \"The most recent value is 0\");\n\n  // Delete\n  fail_unless(delete_stack(stack) == true, \"The stack was successfully deleted\");\n\n}\nEND_TEST\n\nSuite * stack_suite (void) {\n  Suite *s = suite_create (\"Stack\");\n\n  TCase *tc_core = tcase_create (\"Core\");\n  tcase_add_test (tc_core, test_create_push_pop_delete);\n  suite_add_tcase (s, tc_core);\n\n  return s;\n}\n\nint main (void) {\n  int number_failed;\n  Suite *s = stack_suite ();\n  SRunner *sr = srunner_create (s);\n  srunner_run_all (sr, CK_NORMAL);\n  number_failed = srunner_ntests_failed (sr);\n  srunner_free (sr);\n  return (number_failed == 0) ? EXIT_SUCCESS : EXIT_FAILURE;\n}\n\n//cffileid:18\n","name":"unittests.c"},{"value":"c_check_0_9_11\n","name":"Runner"},{"value":"#ifndef CS_CODE_\n#define CS_CODE_\n\n#include <stdlib.h>\n#include <stdbool.h>\n\ntypedef struct Node\n{\n    struct Node *nxt;\n    int value;\n} Node;\n\nbool create_stack(Node **stack);\nbool push(Node **stack, int value);\nbool pop(Node **stack, int *value);\nbool delete_stack(Node **stack);\n\n#endif  // CS_CODE_\n\n//cffileid:17\n","name":"code.h"},{"value":"#include \"code.h\"\n\nbool create_stack(Node **stack) {\n    *stack = NULL;\n    return true;\n}\n\nbool push(Node **stack_ptr_ptr, int value) {\n\n    Node *newnode;\n    newnode = (Node *) malloc(sizeof(Node));\n    if (newnode == NULL) {\n        // The memory allocation failed\n        return false;\n    }\n\n    newnode->value = value;\n\n    if (stack_ptr_ptr == NULL) {\n        *stack_ptr_ptr = newnode;\n    }\n    else {\n        newnode->nxt = *stack_ptr_ptr;\n        *stack_ptr_ptr = newnode;\n    }\n\n    return true;\n}\n\nbool pop(Node **stack_ptr_ptr, int *value) {\n    Node *node_ptr;\n    if (!(node_ptr = *stack_ptr_ptr)) {\n        *value = 0;\n        return false;\n    }\n\n    *value = node_ptr->value;\n    *stack_ptr_ptr = node_ptr->nxt;\n    free(node_ptr);\n    return true;\n}\n\nbool delete_stack(Node **stack) {\n\n    Node *next;\n    while(*stack) {\n        next = (*stack)->nxt;\n        free(*stack);\n        *stack = next;\n    }\n\n    return true;\n}\n//cffileid:16\n","name":"code.c"}]}}